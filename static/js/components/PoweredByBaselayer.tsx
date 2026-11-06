// Monochrome version of baselayer/static/img/logo.svg; it takes the text color
const LOGO_LAYER =
  "M 77.863,51.126 94.872,57.552 90.336,80.420 58.964,66.624 Z";

function BaselayerLogo({ size }: { size: string }) {
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
        fill="currentColor"
        opacity={0.4}
        transform="translate(-55.137,-41.362)"
      />
      <path
        d={LOGO_LAYER}
        fill="currentColor"
        transform="translate(-58.161,-46.654)"
      />
    </svg>
  );
}

function PoweredByBaselayer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #ddd",
        color: "#666",
        fontSize: "0.85em",
        marginTop: "3em",
        paddingTop: "0.75em",
      }}
    >
      <a
        href="https://github.com/cesium-ml/baselayer"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <BaselayerLogo size="1.5em" /> Powered by baselayer
      </a>
    </footer>
  );
}

export default PoweredByBaselayer;
