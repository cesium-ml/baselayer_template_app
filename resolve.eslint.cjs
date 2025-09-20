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

    // Optional: help resolution behavior be closer to bundler defaults
    mainFields: ["browser", "module", "main"],
    mainFiles: ["index"],
    conditionNames: ["import", "module", "browser", "default"],
    symlinks: true,
    // Optional: let absolute imports from src work if desired
    // modules: [r('src'), 'node_modules'],
  },
};
