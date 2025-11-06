import globals from "globals";
import pluginJs from "@eslint/js";

export default [
	{
		ignores: ["node_modules", "dist"],
	},
	{
		files: ["**/*.js"],
		languageOptions: {
			globals: globals.node,
			ecmaVersion: "latest",
			sourceType: "commonjs",
		},
		plugins: {
			js: pluginJs,
		},
		rules: {
			...pluginJs.configs.recommended.rules,
			"no-unused-vars": "warn",
			"no-undef": "error",
			semi: ["error", "always"],
			quotes: ["warn", "double"],
		},
	},
	// Jest globals for test files
	{
		files: ["**/__tests__/**/*.js", "**/*.test.js"],
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
	},
];
