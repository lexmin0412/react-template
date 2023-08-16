module.exports = {
	presets: [
		["@babel/preset-env", { targets: { node: "current" } }],
		["@babel/preset-react", { runtime: "automatic" }], // 自动导入react
		"@babel/preset-typescript",
	],
};
