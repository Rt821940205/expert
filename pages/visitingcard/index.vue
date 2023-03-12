<template>
	<view class="container">
		<view>
			<u-modal :show="show" :title="title" @confirm="confirm">
				<view>
					<u-form :model="userInfo" ref="form1">
						<u-form-item borderBottom>
							<u--input placeholder="请输入工号" v-model="userInfo.snNo"></u--input>
						</u-form-item>
					</u-form>
				</view>
			</u-modal>
		</view>
		<BasicInfo :basicInfo="basicInfo" :eUserName="eUserName" :researchDirection="researchDirection" />
		<AchievementList :achievementList="achievementList" :achievementPageList="achievementPageList" />
	</view>
</template>

<script>
	import Api from "@/server/index.js"
	import BasicInfo from './basic_info.vue'
	import AchievementList from './achievement_list.vue'
	import {
		dictionary
	} from '@/utils/dic.js'
	export default {
		components: {
			BasicInfo,
			AchievementList
		},
		data() {
			return {
				baseList: [],
				loading: true,
				show: false,
				title: '请输入工号',
				userInfo: {
					snNo: '',
				},
				basicInfo: {

				},
				eUserName: [],
				researchDirection: [],
				achievementList: [],
				achievementPageList: []
			}
		},
		mounted() {
			this.getData()
		},
		created() {

		},
		methods: {
			confirm() {
				this.show = !this.show;
				console.log(this.userInfo)
			},
			click(name) {
				this.$refs.uToast.success(name)
				uni.navigateTo({
					url: `/pages/functionintroduction/details/index?id=${name}`
				})
			},
			async getData() {
				try {
					const res1 = await Api.getUserByUserNo({
						userNo: "03974"
					})
					if (res1.code === 1) {
						const {
							data,
							data: {
								eUserName,
								researchDirection
							}
						} = res1
						this.basicInfo = data
						this.eUserName = JSON.parse(eUserName).map(i => i.name)
						this.researchDirection = JSON.parse(researchDirection)
					}
					const res2 = await Api.getUserResourceNum({
						userId: res1.code
					})
					if (res2.code === 1) {
						const {
							data,
						} = res2
						this.achievementList = data.map(a => ({
							name: dictionary[a.resourceCode],
							badge: {
								value: a.num,
							}
						}))
						this.getList()
					}
				} catch (e) {
					console.log(e)
				}
			},
			async getList() {
				try {
					const res = await Api.getUserResourcePage({
						userId: "35",
						resourceCode: "I",
						orderByType: 1,
						pageNo: 1,
						pageSize: 100
					})
					if (res.code === 1) {
						const {
							data
						} = res
						this.achievementPageList = data
					}
				} catch (e) {
					console.log(e)
				}
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

	.container {}
</style>
