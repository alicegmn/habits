import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import a11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules"]),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
      },
    },
    plugins: {
      react,
      "jsx-a11y": a11y,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // base
      ...js.configs.recommended.rules,

      // typescript
      ...tseslint.configs.recommended.rules,

      // react hooks
      ...reactHooks.configs["recommended-latest"].rules,

      // accessibility
      ...a11y.configs.recommended.rules,

      // react modern configs
      "react/react-in-jsx-scope": "off", // not needed for React 17+
    },
    settings: {
      react: { version: "detect" },
    },
  },
]);
