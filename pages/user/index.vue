<template>
	<view class="content">
		<view class="nav-head" :style="{backgroundImage:`url(${myBackgroundImage})`,backgroundSize:'cover'}">
			<view class="nav-title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
				<text class="title">个人主页</text>
			</view>
			<view class="topbox" :style="[{'paddingTop':customBarH + 32 + 'px'}]">
				<view class="user-info">
					<view class="avatar">
						<open-data type="userAvatarUrl"></open-data>
					</view>
					<view class="name">
						你好，
						<open-data type="userNickName" lang="zh_CN"></open-data>
					</view>
				</view>
				
				<view class="attention">
					<view class="attention-item">
						<text class="num">{{userInfo.liveNum}}</text>
						<text class="title">直播关注</text>
					</view>
					<view class="attention-item">
						<text class="num">{{userInfo.goodsNum}}</text>
						<text class="title">商品关注</text>
					</view>
					<view class="attention-item">
						<text class="num">{{userInfo.companyNum}}</text>
						<text class="title">企业关注</text>
					</view>
					<view class="attention-item" @tap="toUrl('footprint/index')">
						<text class="num">{{userInfo.trackNum}}</text>
						<text class="title">足迹</text>
					</view>
				</view>
			</view>		
		</view>
		<view class="my-con">
			<view class="my-vip">
				<image class="clouds" src="../../static/image/clouds.png" mode=""></image>
				<view class="my-vip-con">
					<view class="my-con-left">
						<image src="../../static/image/vip-common.png" mode="aspectFill"></image>
						<text class="vip-type">普通会员</text>
					</view>
					<view class="my-vip-right">
						成为高级会员 
						<text class="iconfont back-right more"></text>
					</view>
				</view>
			</view>
			
			<view class="my-vip-tab">
				<view class="tab-item" v-for="(item,index) in tabList" :key="index">
					<image :src="item.src" mode="aspectFill"></image>
					<text>{{item.title}}</text>
				</view>
			</view>
			
			<view class="my-vip-tab menu-list">
				<view class="tab-item" v-for="(item,index) in menuList" :key="index" @click="toUrl(item.path)">
					<image :src="item.src" mode="aspectFill"></image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<tabbar></tabbar>
	</view>
</template>

<script>
	import myBackgroundImage from "@/static/image/myhead.png"
	import '@/static/icon/icon.scss'
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar,
				myBackgroundImage:myBackgroundImage,
				userInfo:{
					liveNum:23,
					goodsNum:13,
					companyNum:123,
					trackNum:3453
				},
				tabList:[
					{
						title:'我的参观证',
						src:require('@/static/image/visit-card.png')
					},{
						title:'我的健康码',
						src:require('@/static/image/health-code.png')
					},{
						title:'我的行程码',
						src:require('@/static/image/journey-code.png')
					}
				],
				menuList:[
					{
						title:'我的邀约',
						path:'/pages/user/invite/index',
						src:require('@/static/image/invite.png')
					},{
						title:'意向订购单',
						src:require('@/static/image/order.png')
					},{
						title:'我的留言',
						path:'/pages/user/message/index',
						src:require('@/static/image/rectangle.png')
					},{
						title:'我的收藏',
						path:'/pages/user/collected-record/index',
						src:require('@/static/image/collect.png')
					},{
						title:'我的优惠券',
						path:'/pages/user/coupon/index',
						src:require('@/static/image/like.png')
					},{
						title:'预售兑换',
						path:'/pages/user/coin-certificate/index',
						src:require('@/static/image/conversion.png')
					},{
						title:'联系我们',
						src:require('@/static/image/relation.png')
					},{
						title:'关注我们',
						src:require('@/static/image/attention.png')
					},{
						title:'意见反馈',
						src:require('@/static/image/feedback.png')
					}
				]
			}
		},
		methods: {
			 toUrl(url,isTab){
			 	if(isTab){
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
			 	}else{
			 		uni.navigateTo({
			 		  url: url
			 		})
			 	}
			 	
			 },
			
		},
		onShow() {
			this.$store.dispatch('WatchTabbar')
		},
	}
</script>

<style scoped>
	view{
		box-sizing: border-box;
	}
	text{
		color: #222222;
	}
	.content {
		width: 750rpx;
		width: 100%;
		min-height: calc(100vh - 100rpx);
		padding-bottom: 100rpx;
		display: flex;
		flex-direction: column;
		
	}
	
	.nav-head{
		height: 550rpx;
		width: 100%;
		height: 550rpx;
		background: #F18D5F;
	}
	
	.nav-title{
		width: 100%;
		padding-left: 12rpx;
		position: fixed;
		z-index: 9999;
		text-align: center;
		background: linear-gradient(180deg, #EE7C5A 0%, #F18D5F 100%);
	}
	
	.nav-title .title{
		height: 50px;
		line-height: 50px;
		color: #FFFFFF;
	}
	
	.topbox{
		width: 100%;
		padding: 0 24rpx;
		position: relative;
		padding-bottom: 24rpx;
	}
	
	.topbox .user-info{
		display: flex;
		align-items: center;
		margin-bottom: 40rpx;
	}
	
	.user-info .avatar {
		width: 72rpx;
		height: 72rpx;
		margin-right: 30rpx;
		border-radius: 50%;
		overflow: hidden;
		justify-content: center;
	}
	
	.user-info .name {
		font-size: 30rpx;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 42rpx;
		width: 340rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.attention{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 67rpx;
	}
	
	.attention .attention-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.attention .attention-item .num{
		font-weight: 500;
		color: #FFFFFF;
		font-size: 40rpx;
		margin-bottom: 10rpx;
	}
	
	.attention .attention-item .title{
		font-weight: 500;
		color: #FFFFFF;
		font-size: 24rpx;
	}
	
	.my-con{
		padding: 26rpx;
		margin-top: -102rpx;
	}
	
	.my-con .my-vip{
		height: 120rpx;
		box-shadow: 0px 4px 16px 1px rgba(0, 0, 0, 0.14);
		border-radius: 14px;
		background: #FFFFFF;
		position: relative;
		padding: 0 32rpx;
		display: flex;
		margin-bottom: 30rpx;
		align-items: center;
	}
	
	.my-con .my-vip .clouds{
		position: absolute;
		top: 0;
		left: 18rpx;
		width: 120rpx;
		height: 30rpx;
	}
	
	.my-con .my-vip .my-vip-con{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.my-con .my-vip .my-vip-con .my-con-left{
		display: flex;
		align-items: center;
	}
	
	.my-con .my-vip .my-vip-con .my-con-left image{
		width: 40rpx;
		height: 40rpx;
	}
	
	.my-con .my-vip .my-vip-con .my-con-left .vip-type{
		font-weight: 400;
		color: #666666;
		font-size: 36rpx;
		margin-left: 18rpx;
	}
	
	.my-con .my-vip .my-vip-con .my-vip-right{
		width: 240rpx;
		height: 56rpx;
		display: flex;
		align-items: center;
		color: #FF6A48;
		border: 1px solid #FF6A48;
		border-radius: 26rpx;
		font-size: 26rpx;
		padding: 0 24rpx;
	}
	
	.my-con .my-vip .my-vip-con .my-vip-right .more{
		color: #FF6A48;
		font-size: 24rpx;
		margin-left: 8rpx;
	}
	
	.my-con .my-vip-tab{
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: #FFFFFF;
		box-shadow: 0px 4px 16px 1px rgba(0, 0, 0, 0.14);
		border-radius: 14px;
		padding: 30rpx;
	}
	
	.my-con .my-vip-tab .tab-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	.my-con .my-vip-tab .tab-item image{
		width: 50rpx;
		height: 50rpx;
		margin-bottom: 22rpx;
	}
	
	.my-con .my-vip-tab .tab-item text{
		font-weight: 400;
		color: #666666;
		font-size: 34rpx;
	}
	
	.my-con .my-vip-tab.menu-list{
		flex-wrap: wrap;
		margin-top: 30rpx;
	}
	
	.my-con .menu-list .tab-item{
		width: calc((100% - 112rpx) / 3);
		margin-bottom: 60rpx;
	}
	


</style>
