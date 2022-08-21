const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	lintOnSave: false,
	transpileDependencies: true,
	devServer: {
		proxy: 'http://localhost:3000',
	},
});
