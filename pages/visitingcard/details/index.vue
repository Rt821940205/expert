<template>
	<view class="container">
		<view class="video-item">
			<video v-for="(item, index) in videoList" :src="item.fileUrl" :key="index"></video>
		</view>	
	</view>
</template>

<script>
	import Api from '@/server/index.js';
	export default {
		data() {
			return {
				pictureList: [],
				videoList: []
			}
		},
		onLoad(params) {
			this.getData(params)
		},
		methods: {
			getData (params) {
				Api.getDetails({...params}).then(res => {
					if (res.status === 200) {
						this.pictureList = res.data.pictureList
						this.videoList = res.data.videoList
					}
				}).catch(error => {
					console.log(error)
				})
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.video-item {
		display: flex;
		justify-content: space-around;
	}
</style>
