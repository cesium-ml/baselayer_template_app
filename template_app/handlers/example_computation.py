import asyncio
import time

import tornado.ioloop
import tornado.web

from baselayer.app.handlers import BaseHandler


def slow_square(x):
    time.sleep(2)
    return x**2


class ExampleComputationHandler(BaseHandler):
    async def _compute_squares(self, n):
        try:
            squares = await asyncio.gather(
                *(asyncio.to_thread(slow_square, x) for x in range(n))
            )
        except Exception as e:
            return self.push_notification(f"Error executing calculation: {e}", "error")

        self.push_notification("Calculation completed")
        self.action("template_app/EXAMPLE_RESULT", payload={"squares": squares})

    @tornado.web.authenticated
    async def post(self):
        n = int(self.get_json()["n"])

        tornado.ioloop.IOLoop.current().spawn_callback(self._compute_squares, n)

        self.push_notification(f"Computation n={n} submitted")
        return self.success()
