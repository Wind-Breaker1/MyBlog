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
			// 'vue-router': 'VueRouter',
			// vuex: 'Vuex',
			axios: 'axios',
			'element-ui': 'ELEMENT',
		},
	},
	chainWebpack: config => {
		if (process.env.use_analyzer) {
			config
				.plugin('webpack-bundle-analyzer')
				.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
		}
	},
	configureWebpack: config => {
		// 公共代码抽离
		config.optimization = {
			splitChunks: {
				cacheGroups: {
					libs: {
						name: 'chunk-libs',
						test: /[\\/]node_modules[\\/]/,
						priority: 10,
						chunks: 'initial', // only package third parties that are initially dependent
					},
					common: {
						chunks: 'all',
						test: /[\\/]src[\\/]js[\\/]/,
						name: 'common',
						minChunks: 2,
						maxInitialRequests: 5,
						minSize: 0,
						priority: 60,
					},
					styles: {
						name: 'styles',
						test: /\.(sa|sc|c)ss$/,
						chunks: 'all',
						enforce: true,
					},
					pinyin: {
						// split pinyin libs
						name: 'chunk-pinyin',
						test: /[\\/]node_modules[\\/]_?pinyin(.*)/,
						priority: 40,
						chunks: 'async',
						reuseExistingChunk: true,
					},
					html2canvas: {
						// split html2canvas libs
						name: 'chunk-html2canvas',
						test: /[\\/]node_modules[\\/]_?html2canvas(.*)/,
						priority: 40,
						chunks: 'async',
						reuseExistingChunk: true,
					},
					'vue-pdf': {
						// split vue-pdf libs
						name: 'chunk-vue-pdf',
						test: /[\\/]node_modules[\\/]_?vue-pdf(.*)/,
						priority: 40,
						chunks: 'async',
						reuseExistingChunk: true,
					},
					runtimeChunk: {
						name: 'manifest',
					},
				},
			},
		};
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
