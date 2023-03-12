<template>
	<view class="container">
		<view class="tabs">
			<u-tabs :list="achievementList"></u-tabs>
		</view>
		<view class="list">
			<view class="list_item" v-for="(item, index) in achievementPageList">
				<view class="item_header">
					<view class="item_header_l">{{index + 1}}</view>
					<view class="item_header_c">
						<view class="header_c_tit">
							{{item.title}}
						</view>
						<view class="com_text">{{item.creatorAll}}</view>
						<view class="com_text">{{item.keyword}}</view>
						<view class="com_text">{{item.journal}}</view>
					</view>
					<view class="item_header_r">新！</view>
				</view>
				<view class="item_footer">查看原文</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			achievementList: {
				type: Array,
				default: function() {
					return []
				}
			},
			achievementPageList: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
	}
</script>

<style lang="scss">
	.container {
		.tabs {
			display: flex;
			justify-content: center;
		}

		.list {
			margin-top: 20rpx;

			.list_item {
				padding: 30rpx 60rpx 60rpx;
				background: -webkit-linear-gradient(top left, rgba(75, 195, 226, 0.2) 0%, white 30%);
				background: linear-gradient(to bottom right, rgba(75, 195, 226, 0.2) 0%, white 30%);

				.item_header {
					display: flex;
					justify-content: space-between;

					.item_header_l {}

					.item_header_c {
						padding: 0 40rpx;
						font-size: 28rpx;

						.header_c_tit {
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
						}

						.com_text {
							font-size: 20rpx;
							margin-top: 20rpx;
						}
					}

					.item_header_r {
						font-size: 28rpx;
						color: #AD1528;
					}
				}

				.item_footer {
					font-size: 24rpx;
					display: flex;
					justify-content: flex-end;
					color: #316B7A;
				}
			}
		}
	}
</style>
