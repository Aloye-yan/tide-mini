<template>
	<view class="tabbar" >
		<view v-for="(i,index) in tabList" :key="index" class="navigator" @click="pathHandle(i.pagePath)">
			<image v-if="index==active" :src="i.selectedIconPath" class="tabbaricon"></image>
			<image v-else :src="i.iconPath" class="tabbaricon"></image>
			<view :class="{isact: index==active}" class="text">{{i.text}}</view>
		</view>
		<view class="bg"></view>
	</view>
</template>

<script>
	export default {
		props: {
			tabList: {
				type: Array,
				default: () => {
					return [{
						"pagePath": "/pages/index/index",
						"iconPath": require("@/static/image/home.png"),
						"selectedIconPath": require("@/static/image/home_a.png"),
						"text": "首页"
					},
					{
						"pagePath": "/pages/livestream/index",
						"iconPath": require("@/static/image/live.png"),
						"selectedIconPath": require("@/static/image/live.png"),
						"text": "直播"
					},
					{
						"pagePath": "/pages/registration/index",
						"iconPath": require("@/static/image/registor.png"),
						"selectedIconPath": require("@/static/image/registor.png"),
						"text": "预登记"
					},
					{
						"pagePath": "/pages/user/index",
						"iconPath": require("@/static/image/my.png"),
						"selectedIconPath": require("@/static/image/my_a.png"),
						"text": "我的"
					}]
				}
			},
		},
		data() {
			return {
				
			}
		},
		computed: {
			active() {
				return this.$store.getters.activebar
			}
		},
		mounted() {
			
		},
		methods: {
			pathHandle(url) {
				// #ifdef MP-WEIXIN
				uni.switchTab({
					url
				})
				// #endif
				// #ifdef H5
				uni.reLaunch({
					url
				})
				// #endif
			}

		}
	}
</script>

<style>
.tabbar {
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 9;
}
.iswxh5>.bg{
	background-color: #FFFFFF!important;
}
.tabbar>.bg {
	content: '';
	width: 100%;
	height: 100%;
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	background-color: #FFFFFF;
}
.navigator{
	position: relative;
	flex: 1;
	z-index: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.tabbar .isact {
	color: #FF6A48;
}
.navigator .tabbaricon{
	width: 44rpx;
	height: 44rpx;
	margin-bottom: 2rpx;
}
.text{
	font-size: 20rpx;
	color: #666666;
}
</style>
