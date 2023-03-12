<template>
	<view class="header">
		<view class="header_t">
			<view class="header_t_l">
				<image src="@/static/home/logo@2x.png"></image>
			</view>
			<view class="header_t_r">
				<image src="@/static/home/share.png"></image>
				<image src="@/static/home/QRcode.png"></image>
				<image src="@/static/home/update.png"></image>
			</view>
		</view>
		<view class="header_c">
			<view class="header_c_l">
				<image src="@/static/home/user-header.png"></image>
			</view>
			<view class="header_c_r">
				<view class="CN_name">张玉兴</view>
				<view class="EN_name">zhang yu xing</view>
				<view class="isni">ISNI: 04284</view>
				<!-- <view class="insi_list">
					<text class="isni">ISNI: 04284</text>
					<view class="list">
					</view>
				</view> -->
			</view>
		</view>
		<view class="header_b">
			<view class="list">
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
				<u-tag text="标签" size="mini" bgColor="rgba(255, 255, 255, 0.3)"></u-tag>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.header {
		background: -webkit-linear-gradient(bottom left, #316B7A, #85ABB3);
		background: linear-gradient(to top right, #316B7A, #85ABB3);
		padding: 44rpx 36rpx;

		.header_t {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.header_t_l {
				image {
					width: 245rpx;
					height: 50rpx;
				}
			}

			.header_t_r {
				width: 150rpx;
				display: flex;
				justify-content: space-between;

				image {
					width: 28rpx;
					height: 28rpx;
				}
			}
		}

		.header_c {
			margin-top: 50rpx;
			display: flex;

			.header_c_l {
				margin-right: 35rpx;

				image {
					width: 84rpx;
					height: 88rpx;
				}
			}

			.header_c_r {
				// font-weight: bold;
				color: #FFFFFF;

				.CN_name {
					font-size: 32rpx;
				}

				.EN_name {
					font-size: 20rpx;
				}
				
				.isni {
					font-size: 20rpx;
				}

				.insi_list {
					display: flex;
					align-items: center;

					.isni {
						width: 180rpx;
						font-size: 20rpx;
					}

					.list {
						display: flex;
						width: 360rpx;
						overflow-y: scroll;

						>view {
							margin-right: 10rpx;
						}
					}
				}
			}
		}

		.header_b {
			width: 100%;
			margin-top: 50rpx;

			.list {
				display: flex;
				flex-wrap: wrap;

				>view {
					margin-right: 10rpx;
					margin-bottom: 6rpx;
				}
			}
		}
	}
</style>
