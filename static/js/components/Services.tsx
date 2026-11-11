import { useEffect } from "react";

import * as Action from "../actions";
import type { Service } from "../reducers";
import { useAppDispatch, useAppSelector } from "../store";

const REFRESH_MS = 5000;

function formatUptime(seconds: number | null) {
  if (seconds === null) {
    return "";
  }
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) {
    return `${h} h ${m} min`;
  }
  return m > 0 ? `${m} min` : `${seconds} s`;
}

function formatMemory(service: Service) {
  const mb = (service.memory / 2 ** 20).toFixed(0);
  if (service.name === "zygote") {
    return `${mb} MB shared`;
  }
  return service.forked ? `+ ${mb} MB` : `${mb} MB`;
}

function ServiceRow({
  maxMemory,
  service,
}: {
  maxMemory: number;
  service: Service;
}) {
  return (
    <tr className={service.forked ? "forked" : undefined}>
      <td>
        {service.forked ? <span className="branch">└</span> : null}
        {service.name}
      </td>
      <td>
        <span className={`state state-${service.state.toLowerCase()}`}>
          {service.state.toLowerCase()}
        </span>
      </td>
      <td className="num">{service.pid}</td>
      <td className="num">{formatUptime(service.uptime)}</td>
      <td>
        {service.pid !== null && (
          <div className="memory">
            <div className="memory-track">
              <div
                className="memory-bar"
                style={{ width: `${(100 * service.memory) / maxMemory}%` }}
              />
            </div>
            <span>{formatMemory(service)}</span>
          </div>
        )}
      </td>
    </tr>
  );
}

function Services() {
  const dispatch = useAppDispatch();
  const { services } = useAppSelector((state) => state.services);

  useEffect(() => {
    const refresh = async () => {
      if (document.hidden) {
        return;
      }
      const data: unknown = await dispatch(Action.fetchServices());
      if (!(data instanceof Object && "services" in data)) {
        clearInterval(timer);
      }
    };
    const timer = setInterval(() => {
      void refresh();
    }, REFRESH_MS);
    void refresh();
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  // The zygote comes first, followed by the services it forked
  const zygote = services.filter((s) => s.name === "zygote");
  const forked = services.filter((s) => s.forked);
  const others = services.filter((s) => s.name !== "zygote" && !s.forked);
  const maxMemory = Math.max(1, ...services.map((s) => s.memory));

  return (
    <section className="card">
      <h2>Services</h2>

      <div className="table-scroll">
        <table className="services">
          <thead>
            <tr>
              <th>Service</th>
              <th>State</th>
              <th className="num">PID</th>
              <th className="num">Uptime</th>
              <th>Memory</th>
            </tr>
          </thead>
          <tbody>
            {[...zygote, ...forked, ...others].map((service) => (
              <ServiceRow
                key={service.name}
                maxMemory={maxMemory}
                service={service}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Services;
