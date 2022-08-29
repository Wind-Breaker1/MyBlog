const CompressionPlugin = require('compression-webpack-plugin'); //引入
module.exports = {
	lintOnSave: false,
	transpileDependencies: true,
	devServer: {
		proxy: 'http://localhost:3000',
	},
	productionSourceMap: false,
	configureWebpack: {
		externals: {
			vue: 'Vue',
			// 'vue-router': 'Vue-Router',
			// vuex: 'Vuex',
			axios: 'axios',
			'element-ui': 'ELEMENT',
		},
	},
	// configureWebpack: config => {
	// 	if (process.env.NODE_ENV === 'production') {
	// 		config.plugins.push(
	// 			new CompressionPlugin({
	// 				algorithm: 'gzip',
	// 				test: /\.js$|\.html$|\.css$|\.jpg$|\.png/,
	// 				threshold: 10240,
	// 				minRatio: 0.5,
	// 				deleteOriginalAssets: true, // 是否删除源文件
	// 			})
	// 		);
	// 	}
	// },
};
