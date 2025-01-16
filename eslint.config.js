import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import boundaries from "eslint-plugin-boundaries";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      boundaries,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    settings: {
      "boundaries/elements": [
        { type: "domain", pattern: "src/core" },
        { type: "app", pattern: "src/app" },
        { type: "io", pattern: "src/io" },
      ],
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "io",
              allow: ["io"],
            },
            {
              from: "app",
              allow: ["app", "io"],
            },
            {
              from: "domain",
              allow: ["domain", "app", "io"],
            },
          ],
        },
      ],
    },
  }
);
