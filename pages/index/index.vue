<template>
	<view class="content">
		<view class="nav-head">
			<view class="nav-title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
				<text class="title">Music CHINA</text>
			</view>
			<view class="topbox">
				<view class="topbox-left">
					<view class="avatar">
						<open-data type="userAvatarUrl"></open-data>
					</view>
					<view class="name">
						<open-data type="userNickName" lang="zh_CN"></open-data>
					</view>
				</view>
				<view class="topbox-right" @click="navigateTo('/pages/index/exhibit?mode=search')">
					<!-- <image mode="aspectFit" src="@/static/index/search.png"></image> -->
					<input v-model="search" type="text" confirm-type="search" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar
			}
		},
		computed: {
			navBarStyle() {
				let navBarH = `height: ${this.customBarH}px;`
				return navBarH
			}
		},
		onLoad() {

		},
		created(){
			
		},
		methods: {
			
		},
		
	}
</script>

<style>
	.content {
		width: 750rpx;
		width: 100%;
		min-height: calc(100vh - 100rpx);
		padding-bottom: 100rpx;
		display: flex;
		flex-direction: column;
		
	}
	
	.nav-head{
		background: url('../../static/image/head@2x.png') no-repeat;
	}

	.nav-title{
		width: 100%;
		background: #C8C7CC;
		padding-left: 12rpx;
	}
	
	.nav-title .title{
		height: 50px;
		line-height: 50px;
	}
	
	.topbox{
		width: 100%;
		background: pink;
		padding: 24rpx;
		display: flex;
	}
	
	.topbox-left .avatar {
		width: 72rpx;
		height: 72rpx;
		margin-right: 30rpx;
		border-radius: 50%;
		overflow: hidden;
		justify-content: center;
	}
	
	.topbox-left .name {
		font-size: 30rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.6);
		line-height: 42rpx;
		width: 260rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.topbox-right image {
		width: 36rpx;
		height: 36rpx;
		position: absolute;
		top: 18rpx;
		left: 33rpx;
	}
	
	.topbox-right input {
		font-size: 30rpx;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.6);
		line-height: 42rpx;
		background: rgba(142, 142, 147, 0.16);
		border-radius: 14rpx;
		height: 72rpx;
		padding-left: 69rpx;
		padding-right: 10rpx;
	}
	
</style>
