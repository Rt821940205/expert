module.exports = {
	devServer: {
		proxy: {
			'/': {
				target: 'http://dev.heidutech.com:18681',
				// target: 'http://www.kjdn.zjut.edu.cn',
				changeOrigin: true,
			}
		},
	}
}
