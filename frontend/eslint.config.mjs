// services/api/eslint.config.mjs (ref: 9f6a19287f8da0afa9911e18e42d5a165d98da79)
import { defineConfig } from "eslint/config";

export default defineConfig({
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
    // for .mjs ESM configs, use this to set tsconfig root dir
    tsconfigRootDir: new URL(".", import.meta.url).pathname,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // basic TS rules
    // "plugin:@typescript-eslint/recommended-requiring-type-checking" // enable if you set project & want type-aware rules
  ],
  rules: {
    // your custom rules here
  },
});
