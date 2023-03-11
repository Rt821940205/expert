<template>
	<view class="container">
		<view>
			<u-modal :show="show" :title="title">
				<view>
					<u-form :model="userInfo" ref="form1">
						<u-form-item>
							<u--input placeholder="请输入工号" border="bottom" v-model="userInfo.snNo"></u--input>
						</u-form-item>
					</u-form>
				</view>
			</u-modal>
			<u-button @click="show = true">打开</u-button>
		</view>
	</view>
</template>

<script>
	import Api from "@/server/index.js";
	export default {
		data() {
			return {
				baseList: [],
				loading: true,
				show: false,
				title: '请输入工号',
				userInfo: {
					snNo: '',
				},
			}
		},
		mounted() {
			// this.getData()
		},
		created() {

		},
		methods: {
			click(name) {
				this.$refs.uToast.success(name)
				uni.navigateTo({
					url: `/pages/functionintroduction/details/index?id=${name}`
				})
			},
			getData() {
				var data = {}
				Api.getList(data).then(res => {
					console.log(res, 'res')
					if (res.status === 200) {
						this.baseList = res.data
						this.loading = false
					}
				}).catch(error => {
					console.log(error);
				});
			}
		}
	}
</script>

<style lang="scss">
	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}

	.container {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item {
		padding: 10px;
	}
</style>
