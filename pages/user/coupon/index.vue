<template>
	<view class="content">
		<view class="nav-head">
			<view class="nav-box">
				<view class="nav-title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<view class="title">
						<text class="iconfont back-left back" @tap="goBack()"></text>
						我的优惠券
					</view>
				</view>	
				<view class="nav">
				    <view v-for="(item,index) in tabList" :key="index" class="nav-item" @click="tabType = index">
				        <text>{{item}}</text>
				        <view v-if="tabType == index" class="Underline"></view>
				    </view>
				</view>
			</view>
		</view>
		<view class="cont-list" >
			<view class="cont-list-box" v-for="(item , index) in goodsList" :key="index">
				<view @click="toUrl('/pages/user/coupon/detail?type='+item.type+'&status='+item.status)" v-if="item.status == 'unused' && (tabType == 0 || tabType == 1)" class="cont-item"
				:style="[item.type == '1' ? {backgroundImage:`url(${redbackground})`} : item.type == '2' ? {backgroundImage:`url(${yellowbackground})`}: {backgroundImage:`url(${greybackground})`}]"
				>
					<view class="cont-item-left">{{item.type == '1'? ('￥' + item.money) : item.money}}</view>
					<view class="cont-item-right" >
						<view class="cont-item-top">
							<view class="ticket">{{item.type=='1'?'满减券':'折扣券'}}</view>
							<view class="moneyuse">{{item.moneyuse}}</view>
						</view>
						<view class="cont-item-bottom">核销码：{{item.code}}</view>
					</view>
					<view class="con-item-btn" :class="item.type=='2'?'type2':''">立即使用</view>
				</view>
				
				<view @click="toUrl('/pages/user/coupon/detail?type='+item.type+'&status='+item.status)" v-if="item.status == 'used' && (tabType == 0 || tabType == 2)" class="cont-item" :style="[{backgroundImage:`url(${greybackground})`}]">
					<view class="cont-item-left">{{item.type == '1'? ('￥' + item.money) : item.money}}</view>
					<view class="cont-item-right" >
						<view class="cont-item-top">
							<view class="ticket used">{{item.type=='1'?'满减券':'折扣券'}}</view>
							<view class="moneyuse used">{{item.moneyuse}}</view>
						</view>
						<view class="cont-item-bottom used">核销码：{{item.code}}</view>
					</view>
					<view class="con-item-btn used" >已使用</view>
				</view>
			</view>
		</view>


	</view>
</template>

<script> 
	import redbackground from "@/static/image/conpun-list1.png"
	import yellowbackground from "@/static/image/conpun-list2.png"
	import greybackground from "@/static/image/conpun-list3.png"
	import '@/static/icon/icon.scss'
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar,
				tabType:0,
				tabList:["全部",'已使用','未使用'],
				styles:true,
				redbackground:redbackground,
				yellowbackground:yellowbackground,
				greybackground:greybackground,
				goodsList:[
					{
						status:'unused',
						type:'1',
						money:'100',
						Fullminus:'满减卷',
						moneyuse:'满2000使用',
						offcode:'核销码',
						code:'55QQK87412',
						
					},{
						status:'unused',
						type:'2',
						money:'100',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						code:'55QQK87412',
						
					},{
						status:'used',
						money:'100',
						type:'1',
						Fullminus:'满减卷',
						moneyuse:'满2000使用',
						offcode:'核销码',
						code:'55QQK87412',
						
					},{
						status:'used',
						money:'100',
						type:'2',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						code:'55QQK87412',
						
					},{
						status:'used',
						money:'100',
						type:'2',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						code:'55QQK87412',
						
					},{
						status:'used',
						money:'100',
						type:'2',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						code:'55QQK87412',
						
					},{
						status:'used',
						money:'100',
						type:'2',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						code:'55QQK87412',
						
					},{
						status:'used',
						money:'100',
						type:'2',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						code:'55QQK87412',
						
					},{
						status:'used',
						money:'100',
						type:'2',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						code:'55QQK87412',
						
					}
				]
				
			}
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
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
	}
</script>

<style scoped lang="scss">
	view{
		box-sizing: border-box;
	}
	text{
		color: #222222;
	}
	
	.content {
		width: 750rpx;
		width: 100%;
		min-height: 100vh;
		padding-bottom: 100rpx;
		display: flex;
		flex-direction: column;
		background: #F5F5F5;
	}

	.nav-head{
		width: 100%;
		height: 310rpx;
		margin-bottom: -28rpx;
		background: linear-gradient(180deg, #F9BC6E 0%, #F9BC6E 100%);
		.nav-box{
			width: 100%;
			position: fixed;
			z-index: 9999;
			background: linear-gradient(180deg, #EE7C5A 0%, #F9BC6E 100%);
			padding-bottom: 20rpx;
		}
	}
	
	.nav-title{
		width: 100%;
		text-align: center;
		font-size: 34rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}
	
	.nav-title .title{
		height: 50px;
		line-height: 50px;
		color: #FFFFFF;
		position: relative;
	}
	
	.nav-title .title .back{
		font-size: 32rpx;
		color: #FFFFFF;
		position: absolute;
		left: 20rpx;
	}
	.nav{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-around;
	
		.nav-item{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			margin: 0 22rpx;
	
			text{
				color: #fff;
				font-size: 32rpx;
				margin-bottom: 20rpx;
			}
	
			.Underline{
				width: 100%;
				height: 6rpx;
				background: #FF6A48;
				border-radius: 3px;
			}
		}
	}
	
	.cont-list{
		width: 100%;
		height: 100%;
		padding: 0 30rpx;
		z-index: 99;
	}
	.cont-list-box{
		
	}

	.cont-item {
		width: 100%;
		height: 155rpx;
		margin-bottom: 20rpx;
		padding-right: 20rpx;
		background-size: cover;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.cont-item-left{
			display: flex;
			align-items: center;
			justify-content: center;
			width: 27%;
			font-size: 34rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
		
		.cont-item-right{
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			.cont-item-top{
				display: flex;
				align-items: center;
				margin-bottom: 24rpx;
				.ticket{
					padding: 4rpx 10rpx;
					border-radius: 14rpx;
					border: 1px solid #FF4141;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FF4141;
					margin-right: 10rpx;
				}
				.moneyuse{
					font-size: 28rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #222222;
					max-width: 200rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}
			.cont-item-bottom{
				font-size: 24rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FF4141;
			}
			
			.cont-item-bottom.used{
				color: #909090;
			}
		}
		
		.con-item-btn{
			width: 120rpx;
			height: 42rpx;
			text-align: center;
			line-height: 42rpx;
			background: #FF4141;
			border-radius: 21rpx;
			font-size: 22rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
		}
		.type2{
			background: #FF9828;
		}
		.con-item-btn.used{
			background: #CAC4C0;
		}
		
		.ticket.used{
			color: #909090;
			border: 1px solid #909090;
		}
		.moneyuse.used{
			color: #909090;
		}
	}

	
</style>
