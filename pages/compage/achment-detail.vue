<template>
	<view class="app">
		<view class="header">
			<tNav title="成果详情" />
		</view>
	</view>
</template>
<script>
	import Api from "@/server/index.js"
	export default {
		data() {
			return {
				id: '',
			}
		},
		onLoad(option) {
			this.findUserResourcePage(option)
		},

		methods: {
			async findUserResourcePage(option) {
				try {
					const res = await Api.getUserResourcePage(option)
					if (res.code === 1) {
						const {
							data
						} = res
					}
				} catch (e) {}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.app {
		.header {
			height: 64rpx;
			padding: 44rpx 36rpx 0 36rpx;
		}

	}
</style>
