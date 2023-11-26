module.exports = {
	devServer: {
		proxy: {
			'/': {
				// target: 'http://dev.heidutech.com:18681',
				// target: 'http://172.16.13.156',
				target: 'https://paper.zjgsu.edu.cn',
				changeOrigin: true,
			}
		},
	}
}
