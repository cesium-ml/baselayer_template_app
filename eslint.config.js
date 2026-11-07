import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import globals from "globals";

import eslintConfigs from "@dr.pogodin/eslint-configs";

export default defineConfig([
  globalIgnores([
    "**/node_modules",
    "baselayer",
    "static/build",
    "eslint.config.js",
    "rspack.config.ts",
    "doc",
  ]),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  eslintConfigs.configs.typescript,
  eslintConfigs.configs.react,
  {
    rules: {
      "@typescript-eslint/default-param-last": "off", // reducers take state first
      "@typescript-eslint/explicit-module-boundary-types": "off",
      camelcase: "off",
      "default-param-last": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "jsx-a11y/control-has-associated-label": "off",
      "no-param-reassign": "off",
      "react/function-component-definition": "off",
      "react/jsx-wrap-multilines": "off",
      "react/jsx-one-expression-per-line": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-curly-newline": "off",
      "sort-keys": "off",
    },
  },
  {
    settings: {
      // Reads import aliases from tsconfig.json
      "import/resolver": {
        typescript: true,
      },
      react: {
        version: "detect",
      },
    },
  },
  eslintConfigPrettier,
]);
