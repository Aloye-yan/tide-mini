<template>
	<view class="content">
		<view class="nav-head" :style="{backgroundImage:`url(${indexBackgroundImage})`,backgroundSize:'cover'}">
			<view class="nav-title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
				<text class="title">Music CHINA</text>
			</view>
			<view class="topbox" :style="[{'paddingTop':customBarH + 12 + 'px'}]">
				<view class="topbox-left">
					<view class="avatar">
						<open-data type="userAvatarUrl"></open-data>
					</view>
					<view class="name">
						<open-data type="userNickName" lang="zh_CN"></open-data>
					</view>
				</view>
				<view class="topbox-right" @click="toUrl('/pages/search/index?mode=search')">
					<image mode="aspectFit" src="@/static/image/search.png"></image>
					<input v-model="search" type="text" confirm-type="search" />
				</view>
			</view>
		</view>
		
		<view class="nav-bar">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="toUrl(item.path,item.isTab)">
				<image mode="aspectFit" :src="item.src"></image>
				<text>{{item.title}}</text>
			</view>
		</view>
		
		<view class="recommend">
			<view class="preferred" :style="{backgroundImage:`url(${preferredSrc})`,backgroundSize:'cover'}">
				<image class="clouds" mode="aspectFill" src="@/static/image/clouds.png"></image>
				<view class="tag">
					<text>为你优选</text>
				</view>
				<view class="title-con">
					<text class="title">草莓奶冰</text>
					<text class="rank">钟薛高甜品美食专卖</text>
				</view>
			</view>
			<view class="recommend-right">
				<view class="recommend-item" v-for="(item,index) in recommendList" :key="key" :style="{backgroundImage:`url(${item.src})`,backgroundSize:'cover'}">
					<view class="title-con">
						<text class="title">{{item.title}}</text>
						<text class="rank">{{item.rank}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="activity">
			<view class="activity-item" v-for="(item,index) in activity" :key="index" :style="{backgroundImage:`url(${item.src})`,backgroundSize:'cover'}" @click="toUrl('/pages/rush/index')">
				<view class="title-con">
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		
		<view class="news">
			<view class="title-con">
				<view class="title-left">
					<image class="clouds" mode="aspectFill" src="@/static/image/clouds.png"></image>
					<view class="tag">
						<text>展会新闻</text>
					</view>
				</view>
				<view class="title-right" @click="toUrl('/pages/news/index')">
					<image mode="aspectFill" src="../../static/image/fan.png"></image>
					<text>更多</text>
				</view>
			</view>
			<view class="news-con">
				<view class="news-item" v-for="(item,index) in newsList" :key="index">
					<view class="news-left">
						<text class="title">{{item.title}}</text>
						<text class="time">{{item.time}}</text>
					</view>
					<image class="news-right" :src="item.src"></image>
					
				</view>
			</view>
		</view>
		
		<view class="broadcast">
			<view class="title-con">
				<view class="title-left">
					<image class="clouds" mode="aspectFill" src="@/static/image/clouds.png"></image>
					<view class="tag">
						<text>活动直播</text>
					</view>
				</view>
				<view class="title-right" @click="toUrl('/pages/livestream/index',true)">
					<image mode="aspectFill" src="../../static/image/fan.png"></image>
					<text>更多</text>
				</view>
			</view>
			<view class="bannerbox">
				<swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500" next-margin="230rpx"
					previous-margin="30rpx">
					<swiper-item v-for="(i, index) of bannerList" :key="index" class="swiper-item">
						<image class="img" mode="aspectFill" :src="i.src"></image>
						<image class="play" mode="aspectFill" src="@/static/image/play.png"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view class="exhibits">
			<view class="preferred-con">
                <view class="left-preferred">
                    <view class="title-con">
                        <view class="title-left">
                            <image class="clouds" mode="aspectFill" src="@/static/image/clouds.png"></image>
                            <view class="tag">
                                <text>所有展品</text>
                            </view>
                        </view>
                    </view>
                    <view class="preferred" v-for="(item,index) in exhibitsList_left" :key="index" :style="{backgroundImage:`url(${item.src})`,backgroundSize:'cover'}"  @click="toUrl('/pages/exhibitor/exhibit/detail')">
                        <view class="title-cons">
                            <text class="title">{{item.title}}</text>
                            <text class="rank">{{item.rank}}</text>
                        </view>
                    </view>
                </view>
                <view class="right-preferred">
                    <view class="preferred" v-for="(item,index) in exhibitsList_right" :key="index" :style="{backgroundImage:`url(${item.src})`,backgroundSize:'cover'}"  @click="toUrl('/pages/exhibitor/exhibit/detail')">
                        <view class="title-cons">
                            <text class="title">{{item.title}}</text>
                            <text class="rank">{{item.rank}}</text>
                        </view>
                    </view>
                </view>
			</view>
		</view>
		<tabbar></tabbar>
	</view>
</template>

<script>
	import indexBackgroundImage from "@/static/image/head.png"
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar,
				indexBackgroundImage:indexBackgroundImage,
				preferredSrc:require('@/static/image/head.png'),
				search: '',
				navList:[
					{
						title:'展览展示',
						path:'/pages/exhibitor/index',
						src:require('@/static/image/exhibition.png')
					},{
						title:'VR逛展',
						path:'/pages/registration/index',
						src:require('@/static/image/vr.png')
					},{
						title:'活动直播',
						path:'/pages/livestream/index',
						isTab:true,
						src:require('@/static/image/broadcast.png')
					},{
						title:'地图导航',
						path:'/pages/registration/index',
						src:require('@/static/image/map.png')
					},{
						title:'预登记',
						path:'pages/registration/index',
						src:require('@/static/image/register.png')
					}
				],
				recommendList:[
					{
						title:'国风运动鞋',
						rank:'李宁运动专卖',
						src:require('@/static/image/head.png')
					},{
						title:'芊芊马卡龙',
						rank:'茶颜悦色',
						src:require('@/static/image/head.png')
					}
				],
				activity:[
					{
						title:'盲盒预售',
						path:'/pages/rush/index',
						src:require('@/static/image/head.png')
					},{
						title:'红包抽奖',
						path:'',
						src:require('@/static/image/head.png')
					},{
						title:'VR逛展',
						path:'',
						src:require('@/static/image/head.png')
					}
				],
				newsList:[
					{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					}
				],
				bannerList:[
					{
						src:require('@/static/image/head.png')
					},{
						src:require('@/static/image/head.png')
					},{
						src:require('@/static/image/head.png')
					},{
						src:require('@/static/image/head.png')
					}
				],
				exhibitsList:[
					{
						title:'草莓奶冰1',
						rank:'钟薛高甜品美食专卖',
						src:require('@/static/image/head.png')
					},{
						title:'草莓奶冰2',
						rank:'钟薛高甜品美食专卖',
						src:require('@/static/image/head.png')
					},{
						title:'草莓奶冰3',
						rank:'钟薛高甜品美食专卖',
						src:require('@/static/image/head.png')
					},{
						title:'草莓奶冰4',
						rank:'钟薛高甜品美食专卖',
						src:require('@/static/image/head.png')
					},{
						title:'草莓奶冰5',
						rank:'钟薛高甜品美食专卖',
						src:require('@/static/image/head.png')
					},{
						title:'草莓奶冰6',
						rank:'钟薛高甜品美食专卖',
						src:require('@/static/image/head.png')
					}
                ],
                exhibitsList_left:[],
                exhibitsList_right:[]
			}
		},
		computed: {
			
		},
		onShow() {
			this.$store.dispatch('WatchTabbar')
		},
		onLoad() {

		},
		onReachBottom(){
			console.log('加载数据')
			this.exhibitsList.push({
						title:'草莓奶冰1'+this.exhibitsList.length,
						rank:'钟薛高甜品美食专卖',
						src:require('@/static/image/head.png')
					})
			this.getExhibitsList()
		},
		created(){
			this.getExhibitsList()
			
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
			getExhibitsList(){
				this.exhibitsList.forEach((item,index)=>{
				    if(index%2==0){
				        this.exhibitsList_left.push(item)
				    }else{
				        this.exhibitsList_right.push(item)
				    }
				})
			}
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
		width: 100%;
		height: 664rpx;
		background: #F18D5F;
	}

	.nav-title{
		width: 100%;
		padding-left: 12rpx;
		position: fixed;
		z-index: 9999;
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
		display: flex;
	}
	
	.topbox .topbox-left{
		display: flex;
		align-items: center;
	}
	
	.topbox .topbox-right {
		position: relative;
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
	
	.nav-bar{
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 26rpx 30rpx;
	}
	
	.nav-bar .nav-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.nav-bar .nav-item image{
		width: 120rpx;
		height: 120rpx;
	}
	
	.nav-bar .nav-item text{
		font-size: 28rpx;
	}
	
	.recommend{
		width: 100%;
		height: 468rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 26rpx;
	}
	
	.recommend .preferred{
		height: 100%;
		width: 50%;
		position: relative;
		box-shadow:0 0 17rpx 3rpx #999;
		border-radius: 8px;
		background: #F18D5F;
	}
	
	.news{
		margin: 0 30rpx;
		height: 820rpx;
		box-shadow: 0px 4px 16px 1px rgba(0, 0, 0, 0.14);
		border-radius: 14px;
		margin-bottom: 26rpx;
	}
	
	.news .title-con,.broadcast .title-con{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 86rpx;
		padding: 0 20rpx;
	}
	
	
	.news .title-con .title-left,.broadcast .title-con .title-left{
		height: 100%;
		position: relative;
	}
	
	
	.news .title-con .title-right,.broadcast .title-con .title-right{
		display: flex;
		align-items: center;
	}
	
	.news .title-con .title-right image,.broadcast .title-con .title-right image{
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}
	
	.news .title-con .title-right text,.broadcast .title-con .title-right text{
		font-size: 30rpx;
		color: #666666;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.recommend .preferred .clouds,.news .title-con .title-left .clouds,.broadcast .title-con .title-left .clouds,.exhibits .title-con .title-left .clouds{
		width: 156rpx;
		height: 35rpx;
		position: absolute;
		left: 10rpx;
		top: 0rpx;
	}
	
	.recommend .preferred .tag,.news .title-con .title-left .tag,.broadcast .title-con .title-left .tag,.exhibits .title-con .title-left .tag{
		position: absolute;
		left: 24rpx;
		top: 35rpx;
		width: 146rpx;
		height: 50rpx;
		background: linear-gradient(180deg, #F7D25E 0%, #F8E37B 100%);
		border-radius: 8px;
		opacity: 0.82;
		text-align: center;
		line-height: 50rpx;
	}
	
	.recommend .preferred .tag text,.news .title-con .title-left .tag text,.broadcast .title-con .title-left .tag text,.exhibits .title-con .title-left .tag text{
		font-size: 30rpx;
		font-weight: 500;
		background: linear-gradient(180deg, #F7D25E 0%, #F8E37B 100%);
		border-radius: 8px;
	}
	
	.news .title-con .title-left .clouds,.broadcast .title-con .title-left .clouds{
		left: -10rpx;
	}
	
	.news .title-con .title-left .tag,.broadcast .title-con .title-left .tag{
		left: 0;
	}
	
	.news .news-con{
		overflow-y: hidden;
	}
	
	.news .news-con .news-item{
		border-top: 1px solid #A6A6A6;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx;
	}
	
	.news .news-con .news-item:first-child{
		border: none;
	}
	
	.news .news-con .news-item .news-left{
		margin-right: 40rpx;
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	
	.news .news-con .news-item .news-left .title{
		font-weight: 400;
		color: #333333;
		font-size: 30rpx;
		 overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		-ms-text-overflow: ellipsis;
		text-overflow: ellipsis;
	}
	
	.news .news-con .news-item .news-left .time{
		font-weight: 400;
		color: #888888;
		font-size: 28rpx;
	}
	
	.news .news-con .news-item .news-right{
		width: 180rpx;
		height: 140rpx;
	}
	
	.recommend .preferred .title-con,.exhibits .preferred .title-cons{
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		height: 180rpx;
		width: 100%;
		background: rgba(0,0,0,0.39);
		border-radius: 0px 0px 8px 8px;
		padding:0 20rpx;
		justify-content: center;
	}
	
	.recommend .title-con .title,.exhibits .preferred .title-cons .title{
		font-size: 30rpx;
		font-weight: 500;
		color: #FFFFFF;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.recommend .title-con .rank,.exhibits .preferred .title-cons .rank{
		font-size: 28rpx;
		color: #FFFFFF;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.recommend .recommend-right{
		display: flex;
		flex-direction: column;
		width: 50%;
		height: 100%;
		margin-left: 26rpx;
	}
	
	.recommend .recommend-right .recommend-item{
		width: 100%;
		height: 100%;
		position: relative;
		border-radius: 8px;
		box-shadow:0 0 17rpx 3rpx #999;
	}
	
	.recommend .recommend-right .recommend-item:first-child{
		margin-bottom: 26rpx;
	}
	
	.recommend .recommend-right .title-con{
		position: absolute;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 96rpx;
		width: 100%;
		background: rgba(0,0,0,0.39);
		border-radius: 0px 0px 8px 8px;
		padding:0 20rpx;
	}
	
	.activity{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 26rpx;
		margin-bottom: 26rpx;
	}
	
	.activity .activity-item{
		width: calc((100% - 52rpx) / 3);
		height: 161rpx;
		border-radius: 14px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #F18D5F;
	}
	
	.activity .activity-item:nth-child(2){
		margin: 0 26rpx;
	}
	
	.activity .activity-item .title-con{
		width: 180rpx;
		height: 100rpx;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 14px;
		line-height: 100rpx;
		text-align: center;
	}
	
	.activity .activity-item .title-con text{
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.broadcast{
		margin: 0 30rpx;
		height: 386rpx;
		box-shadow: 0px 4px 16px 1px rgba(0, 0, 0, 0.14);
		border-radius: 14px;
		margin-bottom: 26rpx;
	}
	
	.broadcast .bannerbox {
		width: 750rpx;
		width: 100%;
		padding-top: 30rpx;
	}
	
	.broadcast .bannerbox .swiper {
		height: 240rpx;
		margin-bottom: 26rpx;
	}
	
	.broadcast .bannerbox .swiper-item{
		position: relative;
	}
	
	.broadcast .bannerbox .swiper-item .img {
		display: block;
		height: 240rpx;
		width: 400rpx;
		border-radius: 26rpx;
	}
	
	.broadcast .bannerbox .swiper-item .play {
		width: 80rpx;
		height: 80rpx;
		position: absolute;
		left: calc(50% - 40rpx);
		top: calc(50% - 40rpx);
	}
	
	.exhibits{
		margin: 0 30rpx;
		box-shadow: 0px 4px 16px 1px rgba(0, 0, 0, 0.14);
		border-radius: 14px;
		margin-bottom: 26rpx;
		position: relative;
	}
	
	.exhibits .title-con{
		height: 86rpx;
        margin-left: 10rpx;
	}

	.exhibits .title-con .title-left{
		overflow: hidden;
	}
	
    .exhibits .preferred-con .left-preferred,
    .exhibits .preferred-con .right-preferred{
        width: 50%;
		
    }

    .exhibits .preferred-con .right-preferred{
        padding-top: 36rpx;
     }

    .exhibits .preferred-con .left-preferred .preferred{
        margin-top: 36rpx;
    }

	.exhibits .preferred-con{
		display: flex;
        width: 100%;
		justify-content: space-between;
		flex-wrap: wrap;
		height: 100%;
		padding-right: 26rpx;
		overflow-y: auto;
	}
	
	.exhibits .preferred{
		height: 462rpx;
		width:calc(100% - 26rpx);
		position: relative;
		border-radius: 8px;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-left: 26rpx;
		margin-bottom: 26rpx;
		
	}

    .exhibits .title-con .title-left .clouds{
        position: static;
        display: inherit;
    }

    .exhibits .title-con .title-left .tag{
        position: static;
    }
	
</style>
