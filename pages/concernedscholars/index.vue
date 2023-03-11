<template>
	<view class="wrap">
		<view class="box" @click="goSearch('getCollageList')">
			学校
		</view>
		<view class="box">
			老师
		</view>
		<view class="box">
			班级
		</view>
		<view class="box">
			电话
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		mounted() {
			// this.getData()
		},
		created() {

		},
		methods: {
			goSearch(api) {
				uni.navigateTo({
					url: `/pages/search/index?api=${api}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.wrap {
		padding: 12px;
	}
</style>
