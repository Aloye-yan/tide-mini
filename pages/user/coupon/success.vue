<template>
	<view class="content" >
		<view class="header" ref="header">
			<view class="header-con">
				<view class="title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<text class='iconfont back-left title-text' @tap="goBack()"></text>
					<text class='title-text'>我的优惠券</text>
				</view>
			</view>
		</view>
		
		<view class="con-box" >
			<image src="../../../static/image/submit-success.png" mode="aspectFill"></image>
			<view class="title">您已成功使用该券</view>
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
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		position: relative;
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
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 200rpx;
		
		image{
			width: 120rpx;
			height: 120rpx;
			margin-bottom: 24rpx;
		}
		.title{
			font-size: 38rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #2D2D2D;
		}
	}
	
</style>
