import path from "node:path";

import { defineConfig } from "@rspack/cli";

const root = import.meta.dirname;

export default defineConfig({
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: {
    main: "./static/js/components/Main.tsx",
  },
  output: {
    path: path.resolve(root, "static/build"),
    publicPath: "/static/build/",
    filename: "[name].bundle.js",
    chunkFilename: "[name].[contenthash].bundle.js",
  },
  module: {
    rules: [
      {
        // TypeScript and JSX, also in baselayer's .js and .jsx files
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: { syntax: "typescript", tsx: true },
            transform: { react: { runtime: "automatic" } },
          },
        },
        type: "javascript/auto",
      },
      {
        // Files named *.module.css are CSS modules. The CSS goes to
        // static/build/[name].bundle.css: link it from static/index.html.
        test: /\.css$/,
        type: "css/auto",
      },
    ],
  },
  resolve: {
    // Import aliases are defined in tsconfig.json
    tsConfig: path.resolve(root, "tsconfig.json"),
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  watchOptions: {
    ignored: /node_modules/,
  },
});
