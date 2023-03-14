<template>
	<view class="app">
		<tNav title="成果详情" />
		<view class="detail_dis" v-for="item in list" :key="item.name">
			<view class="detail_left">
				{{ item.name || '暂无数据' }}
			</view>
			<view class="detail_right">
				{{ item.content || '暂无数据' }}
			</view>
		</view>
	</view>
</template>
<script>
	import Api from "@/server/index.js"
	import {
		achmentDetailDic
	} from '@/utils/dic.js'
	export default {
		data() {
			return {
				id: '',
				list: []
			}
		},
		onLoad(option) {
			this.findResourceById(option)
		},

		methods: {
			async findResourceById(option) {
				try {
					const res = await Api.getResourceById(option)
					if (res.code === 1) {
						const {
							data
						} = res
						const metchCode = (option.code === 'I' || option.code === 'E' || option.code === 'U' || option
							.code === 'J') ? 'I' : option.code
						const initArr = Array.from(achmentDetailDic[metchCode])
						const finalArr = initArr.map(f => ({
							name: f['name'],
							content: data[f['index']]
						}))
						this.list = finalArr
					}
				} catch (e) {}
			},
		}
	}
</script>
<style lang="scss" scoped>
	.app {
		padding: 44rpx 36rpx 0 36rpx;

		.detail_dis {
			display: flex;
			margin-bottom: 30rpx;
			justify-content: space-between;
			font-family: PingFangSC-Medium, sans-serif;
			padding: 0 12rpx;

			.detail_left {
				color: #316B7A;
				font-size: $uni-font-size-lg;
				font-weight: 500;
			}

			.detail_right {
				width: 450rpx;
				font-size: $uni-font-size-lg;
				color: #000000;
				font-weight: 300;
				line-height: 50rpx;
			}
		}
	}
</style>
