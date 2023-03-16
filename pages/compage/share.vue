<template>
	<view class="container">
		<view class="header">
			<t-nav title="海报"></t-nav>
    	</view>
	</view>
</template>

<script>
import tNav from '@/components/tNav/tNav'
	export default {
		components:{
			tNav
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.container{
	.header{
		padding: $zgd-logo-padding;
	}
}

</style>
