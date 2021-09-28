<template>
	<view class="content" >
		<view class="header" ref="header">
			<view class="header-con">
				<view class="title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<text class='iconfont back-left title-text' @tap="goBack()"></text>
					<text class='title-text'>兑换卷</text>
				</view>
			</view>
		</view>
		
		<view class="con-box" :style="[{'padding-top':customBarH + 'px'}]">
			<view class="ticket-con" :style="{backgroundImage:`url(${bgImg})`}">
				<view class="ticket-con-top">
					<image class="ticket-left" src="../../../static/image/erke.png" mode="aspectFill"></image>
					<view class="ticket-right" >
						<view class="ticket-top">
							<view class="moneyuse">{{ticketInfo.moneyuse}}</view>
						</view>
						<view class="ticket-bottom">兑换时间：{{ticketInfo.time}}</view>
					</view>
				</view>
				<view class="ticket-con-bottom">
					<view class="code-con">
						<view class="code-title">核销码</view>
						<view class="code">·{{ticketInfo.code}}</view>
					</view>
					<view class="status" :class="ticketInfo.status=='2'?'used':''">{{ticketInfo.status=='1'?'未使用  ':'已使用'}}</view>
				</view>
			</view>
			<view class="rank">
				<view class="textconter">使用说明</view>
				<view class="textconterx">Directions for use</view>
				<view class="conttext">
					<view>·该提货码可用日期为展会全部3天，每张券只能使用一次</view>
					<view>·该提货码不可赠予他人使用</view>
					<view>·该提货码一经兑换，概不退换，最终解释权</view>
					<view>·使用该券时，请向工作人员核销该券码信息</view>
				</view>
			</view>
		</view>
		
		<view class="contotbtn">
			<input v-model="rank" class="inputtext" placeholder="请工作人员在此输入">
			<view class="submit" @click="toUrl('/pages/user/coupon/success')">确认</view>
		</view>
	</view>
</template>

<script>
	import bgImg from "@/static/image/BG1.png"
	import '@/static/icon/icon.scss'
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar,
				bgImg:bgImg,
				ticketInfo:{
					type:'1',
					status:'unused',
					money:'100',
					Fullminus:'折扣卷',
					moneyuse:'指定商品9.5折',
					offcode:'核销码',
					code:'55QQK87412',
					time:'2020年11月3日-5日',
				},
				rank:'',
				marginBottom:'0'
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
			goBack(){
				uni.navigateBack()
			},
		},
		onLoad(option){
			uni.onKeyboardHeightChange(res => {
			    this.marginBottom = res.height
			})
			if(option && Object.keys(option).length){
				this.ticketInfo.status = option.status
				this.ticketInfo.type = option.type
			}
			
		},
		onUnload() {      
		    uni.offKeyboardHeightChange()
		}, 
	}
</script>
	
<style lang="scss">
	view{
		box-sizing: border-box;
	}
	text{
		color: #222222;
	}
	.content {
		width: 750rpx;
		width: 100%;
		min-height: calc(100vh - 246rpx);
		display: flex;
		flex-direction: column;
		background: #F5F5F5;
		position: relative;
		margin-bottom: 246rpx;
	}
	.header{
		width: 100%;
		position: fixed;
		z-index: 999;
		background: #FFFFFF;
		.header-con{
			width: 100%;
			padding: 0 30rpx;
			background: #FFFFFF;
		}
		.title{
			font-size: 37rpx;
			font-weight: 500;
			color: #222222;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			.title-text{
				color: #222222;
			}
			.back-left{
				position: absolute;
				left: 0;
			}
		}
	}
	
	.con-box{
		padding: 24rpx;
		padding-bottom: 246rpx;
		.ticket-con{
			height: 400rpx;
			background-size: cover;
			background-repeat:no-repeat;
			padding: 34rpx;
			display: flex;
			flex-direction: column;
			padding-bottom: 0;
			
			.ticket-con-top{
				display: flex;
				align-items: stretch;
				height: 50%;
				border-bottom: 1px dashed #E1B87A;
				margin-bottom: 40rpx;
				.ticket-left{
					width: 160rpx;
					height: 160rpx;
					border-radius: 8rpx;
					margin-right: 20rpx;
				}
				.FF9828{
					background: #FF9828;
				}
				.ticket-right{
					flex: 1;
					display: flex;
					flex-direction: column;
				    
					.ticket-top{
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
					.ticket-bottom{
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #2D2D2D;
					}
					
					.cont-item-bottom.used{
						color: #909090;
					}
				}
			}
			
			.ticket-con-bottom{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.code-con{
					display: flex;
					flex-direction: column;	
					font-size: 30rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #2D2D2D;
					
					.code-title{
						margin-bottom: 14rpx;
					}
				}
				.status{
					font-size: 34rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FF4141;
				}
				.status.used{
					color: #909090;
				}
			}
		}
		.rank{
			padding: 16rpx;
			.textconter{
				font-size: 34rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #222222;
				margin-bottom: 16rpx;
			}
			.textconterx{
				font-size: 24rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #A5A5A5;
				margin-bottom: 24rpx;
			}
			.conttext{
				background: #FFFFFF;
				padding: 24rpx;
				box-shadow: 0px 0px 10rpx 0px #F1F1F3;
				border-radius: 10rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #4C4C4C;
				line-height: 40px;
			}
		}
	}
	.contotbtn{
		width: 100%;
		height: 246rpx;
		padding: 30rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0px 0px;
		display: flex;
		flex-direction: column;
		position: fixed;
		bottom: 0;
		left: 0;
		
		input{
			height: 86rpx;
			background: rgba(245, 245, 245, 0.5);
			border-radius: 10rpx;
			border: 1px solid #BBBBBB;
			margin-bottom: 30rpx;
			padding:0 20rpx;
		}
		.submit{
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			background: #FF4141;
			border-radius: 40rpx;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
	
</style>
