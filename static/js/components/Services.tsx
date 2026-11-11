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

function formatMemory(service: Service, hasZygote: boolean) {
  const mb = (service.memory / 2 ** 20).toFixed(0);
  if (service.name === "zygote") {
    return `${mb} MB shared`;
  }
  return hasZygote ? `+ ${mb} MB` : `${mb} MB`;
}

function ServiceRow({
  hasZygote,
  maxMemory,
  service,
}: {
  hasZygote: boolean;
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
            <span>{formatMemory(service, hasZygote)}</span>
          </div>
        )}
      </td>
    </tr>
  );
}

function Services() {
  const dispatch = useAppDispatch();
  const { preload, services } = useAppSelector((state) => state.services);

  useEffect(() => {
    void dispatch(Action.fetchServices());
    const timer = setInterval(() => {
      void dispatch(Action.fetchServices());
    }, REFRESH_MS);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch]);

  // The zygote comes first, followed by the services it forked
  const zygote = services.filter((s) => s.name === "zygote");
  const forked = services.filter((s) => s.forked);
  const others = services.filter((s) => s.name !== "zygote" && !s.forked);
  const maxMemory = Math.max(1, ...services.map((s) => s.memory));
  const hasZygote = zygote.length > 0;

  return (
    <section className="card">
      <h2>Services</h2>
      <p>
        supervisord runs each service.{" "}
        {hasZygote
          ? `The zygote imports ${preload.join(", ")} once, then forks the
          Python services from it. They share the zygote's memory, and each
          service adds its own.`
          : null}
      </p>

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
                hasZygote={hasZygote}
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
