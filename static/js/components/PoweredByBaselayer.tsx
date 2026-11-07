// Drawn from baselayer/static/img/logo.svg; the monochrome logo takes the text color
const LOGO_LAYER =
  "M 77.863,51.126 94.872,57.552 90.336,80.420 58.964,66.624 Z";

function BaselayerLogo({
  monochrome,
  size,
}: {
  monochrome: boolean;
  size: string;
}) {
  return (
    <svg
      aria-hidden="true"
      height={size}
      style={{ verticalAlign: "middle" }}
      viewBox="0.5 4.2 39.5 35.2"
      width={size}
    >
      <path
        d={LOGO_LAYER}
        fill={monochrome ? "currentColor" : "#999999"}
        opacity={monochrome ? 0.4 : 1}
        transform="translate(-55.137,-41.362)"
      />
      <path
        d={LOGO_LAYER}
        fill={monochrome ? "currentColor" : "#aa008a"}
        fillOpacity={monochrome ? 1 : 0.54}
        stroke={monochrome ? "none" : "#ffffff"}
        strokeWidth={0.5}
        transform="translate(-58.161,-46.654)"
      />
    </svg>
  );
}

function PoweredByBaselayer({ monochrome = false }: { monochrome?: boolean }) {
  return (
    <footer
      style={{
        borderTop:
          "1px solid color-mix(in srgb, currentColor 15%, transparent)",
        opacity: 0.7,
        fontSize: "0.85em",
        marginTop: "3em",
        paddingTop: "0.75em",
      }}
    >
      <a
        href="https://github.com/cesium-ml/baselayer"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        Powered by <BaselayerLogo monochrome={monochrome} size="1.5em" />{" "}
        {/* A named font first keeps the size; plain "monospace" renders smaller */}
        <span
          style={{
            fontFamily:
              "ui-monospace, Menlo, Consolas, 'DejaVu Sans Mono', monospace",
          }}
        >
          baselayer
        </span>
      </a>
    </footer>
  );
}

export default PoweredByBaselayer;
