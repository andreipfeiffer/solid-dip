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
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { boundaries },
    settings: {
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        { type: "domain", pattern: "*/core/*" },
        { type: "app", pattern: "*/app/*" },
        { type: "ui", pattern: "*/ui/*" },
        { type: "api", pattern: "*/api/*" },
      ],
    },
    rules: {
      ...boundaries.configs.recommended.rules,
      "boundaries/entry-point": ["off"],
      "boundaries/element-types": [
        "error",
        {
          default: "allow",
          message:
            'Modules in the "${file.type}" package are not allowed to depend on modules from the "${dependency.type}" package',
          rules: [
            { from: "ui", allow: ["ui"] },
            { from: "api", allow: ["api", "app", "domain"] },
            { from: "app", allow: ["app", "domain"] },
            { from: "domain", disallow: ["api", "ui", "app"] },
          ],
        },
      ],
    },
  }
);
