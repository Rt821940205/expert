module.exports = {
	devServer: {
		proxy: {
			'/': {
				target: 'http://dev.heidutech.com:18681',
				changeOrigin: true,
			}
		},
	}
}
