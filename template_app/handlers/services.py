import asyncio

import tornado.web
from supervisor.options import ClientOptions

from baselayer.app.handlers import BaseHandler
from baselayer.tools.memory_usage import SUPERVISORD_CFG, forked_pid, service_memory


def service_info(cfg):
    """Return the state and memory use of each supervisor service."""
    options = ClientOptions()
    options.realize(["-c", SUPERVISORD_CFG])
    supervisor = options.getServerProxy().supervisor

    services = []
    for p in supervisor.getAllProcessInfo():
        name = p["name"] if p["group"] == p["name"] else f"{p['group']}:{p['name']}"
        pid = p["pid"] or None
        service_pid = pid and forked_pid(pid)
        _, rss, _, uss = service_memory(name, pid) if pid else (0, 0, None, None)
        services.append(
            {
                "name": name,
                "state": p["statename"],
                "pid": service_pid or pid,
                "forked": service_pid is not None,
                "uptime": p["now"] - p["start"] if pid else None,
                # The zygote's memory is shared; each other service adds its own
                "memory": rss if name == "zygote" or uss is None else uss,
            }
        )

    return {
        "services": sorted(services, key=lambda s: s["name"]),
        "preload": cfg["zygote.preload"] or [cfg["app.factory"].rsplit(".", 1)[0]],
    }


class ServicesHandler(BaseHandler):
    @tornado.web.authenticated
    async def get(self):
        info = await asyncio.to_thread(service_info, self.cfg)
        return self.success(data=info)
