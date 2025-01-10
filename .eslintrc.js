module.exports = {
	root: true,
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: 2020,
		sourceType: "module",
	},
	env: {
		browser: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:vue/vue3-recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	plugins: ["vue", "@typescript-eslint"],
	rules: {
		"prettier/prettier": ["error"],
		// 自定义规则可以在这里添加
		"@typescript-eslint/no-explicit-any": "off",
	},
};