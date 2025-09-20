const path = require("path");

const ROOT = __dirname;
const r = (...p) => path.resolve(ROOT, ...p);

module.exports = {
  resolve: {
    // Match extensions from rspack.config.js
    extensions: [".js", ".jsx"],

    // Replicate alias from rspack.config.js
    alias: {
      baselayer: path.resolve(ROOT, "baselayer/static/js"),
    },
  },
};
