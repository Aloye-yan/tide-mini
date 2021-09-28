<template>
	<view class="content">
        <view class="header" ref="header">
			<view class="header-con" :style="{backgroundImage:`url(${indexBackgroundImage})`,backgroundSize:'cover'}">
				<view class="title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<text class='iconfont back-left title-text' @tap="goBack()"></text>
				</view>
			</view>
        </view>
		
		<view class="con-box">
			<view class="title-con">
				<view class="title-left">今天预售</view>
				<view class="title-right" @click="toUrl('allrush')">
					<text>更多预售</text>
					<text class="iconfont back-right"></text>
				</view>
			</view>
			
			<view class="rush-list">
				<view class="rush-item" v-for="(item,index) in rushList" :key="index">
					<view class="rush-left">
						<image :src="item.src" mode="aspectFill"></image>
						<view class="rush-con">
							<view class="title-name">{{item.name}}</view>
							<view class="title-price">￥{{item.price}}</view>
							<view class="title-num">剩余：{{item.num}}</view>
						</view>
					</view>
					<view class="rush-right">
						<view class="sold-out">已售{{item.soldOut}}</view>
						<view class="calculate" v-if="isStart">
							<image src="../../static/image/subtract.png" mode="aspectFill" @click="subtract(item.soldNum,index)"></image>
							<input type="number" v-model="item.soldNum" />
							<image src="../../static/image/add.png" mode="aspectFill" @click="add(item.soldNum,index)"></image>
						</view>
						<image v-else class="dis-add" src="../../static/image/dis-add.png" mode="aspectFill"></image>
					</view>
				</view>
				<view v-if="isStart&&!isSoldOut" class="buy-btn" @click="openRush()">
					<view class="text">我要抢购</view>
				</view>
				<view v-if="!isStart&&!isSoldOut" class="buy-btn">
					<view class="text">距离开抢还有</view>
					<view class="text time">{{countTime}}</view>
				</view>
				<view v-if="isSoldOut" class="buy-btn sold-out">
					<view class="text">已抢光</view>
				</view>
				
				<view class="have-buy-con" v-if="isStart || isSoldOut">
					<view class="have-buy" v-for="(item,index) in soldList" :key="index">
						<view class="index">{{soldList.length - index}}</view>
						<image :src="item.src" mode="aspectFill"></image>
						<view class="buy-con">
							<view class="buy-title">
								<text class="buy-name">{{item.name}}</text>
								<text>{{item.time}}小时</text>
							</view>
							<view class="buy-rank">{{item.rank}}</view>
						</view>
					</view>
					<view class="more">点击加载更多…</view>
				</view>
				
				
			</view>
		</view>
		
		<uni-popup ref="rush" type="dialog" @maskClick="close()">
			<view class="dialog-box">
				<view class="success" v-if="isSuccess">
					<view class="title">抢购成功！</view>
						<view class="title-message">请在个人中心-预售兑换中查看</view>
						<view class="btn">
							<view class="cancel" @click="close()">取消</view>
							<view class="ok">去查看</view>
						</view>
				</view>
				<view class="faild" v-else>
					<view class="title">抢购失败</view>
						<view class="title-message">由于库存不足，抢购失败</view>
						<view class="faild-btn" @click="close()">我知道了</view>
				</view>
				
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import '@/static/icon/icon.scss'
	import indexBackgroundImage from "@/static/image/head.png"
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
                customBarH: this.customBar,
				indexBackgroundImage:indexBackgroundImage,
                searchType:0,
				exhibitInfo:{
					name:'中国李宁',
					booth:'E.12',
					browseNum:3543,
					collectNum:7865,
					praiseNum:767,
					popularityNum:768,
					introduction:'李宁公司创立于1990年，三十多年我们不断探索和创新，以“用运动燃烧激情”为使命，致力于专业体育用品的创造，努力让运动改变生活，追求更高境界的突破。我们秉承"消费者导向"的核心价值观，致力于成为源自中国并被世界认可的国际一流具有时尚属性的专业运动品牌企业。'
				},
				rushList:[
					{
						name:'安踏跑步鞋',
						price:360,
						num:87,
						soldOut:0,
						soldNum:0,
						src:require('@/static/image/shoes.png'),
					},{
						name:'安踏跑步鞋',
						price:360,
						num:87,
						soldOut:0,	
						soldNum:0,
						src:require('@/static/image/shoes.png')
					},{
						name:'安踏跑步鞋',
						price:360,
						num:87,
						soldOut:0,
						soldNum:0,
						src:require('@/static/image/shoes.png')
					},{
						name:'安踏跑步鞋',
						price:360,
						num:87,
						soldOut:0,
						soldNum:0,
						src:require('@/static/image/shoes.png')
					},{
						name:'安踏跑步鞋',
						price:360,
						num:87,
						soldOut:0,	
						soldNum:0,
						src:require('@/static/image/shoes.png')
					}
				],
				soldList:[
					{
						name:'琼啊',
						time:10,
						num:87,
						rank:'李宁跑步球鞋+1、回力跑步鞋+1',
						soldNum:0,
						src:require('@/static/image/shoes.png'),
					},{
						name:'琼啊',
						time:10,
						num:87,
						rank:'李宁跑步球鞋+1、回力跑步鞋+1',
						soldNum:0,
						src:require('@/static/image/shoes.png'),
					},{
						name:'琼啊',
						time:10,
						num:87,
						rank:'李宁跑步球鞋+1、回力跑步鞋+1',
						soldNum:0,
						src:require('@/static/image/shoes.png'),
					},{
						name:'琼啊',
						time:10,
						num:87,
						rank:'李宁跑步球鞋+1、回力跑步鞋+1',
						soldNum:0,
						src:require('@/static/image/shoes.png'),
					},{
						name:'琼啊',
						time:10,
						num:87,
						rank:'李宁跑步球鞋+1、回力跑步鞋+1',
						soldNum:0,
						src:require('@/static/image/shoes.png'),
					},{
						name:'琼啊',
						time:10,
						num:87,
						rank:'李宁跑步球鞋+1、回力跑步鞋+1',
						soldNum:0,
						src:require('@/static/image/shoes.png'),
					}
				],
				countTime:'00:00:00',
				isStart:false,
				isSoldOut:false,
				isSuccess:false
				
			}
        },
		watch: {
			
		},
        mounted(){
			// '2021/09/27 20:20:20'
            this.handleDate('2021/09/27 19:28:50')
        },
		onReachBottom() {
			
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
           handleDate(startTime){
			   if(startTime){  //如果设置了开始时间
					this.isStart = false
			   		this.countTime = setInterval(()=>{
			            //注：不论安卓还是ios，请将时间如 2020-02-02 20:20:20 转化为 2020/02/02 20:20:20 这种形式后再使用，否则无法转换，如下转换即可↓
			   			let transedPreTime = startTime.replace(/-/g,'/') //这里转化时间格式为以/分隔形式
			   			let nowTime = new Date().getTime();
			   			let preTime = new Date(transedPreTime).getTime()
			   			let obj = null;
			   			if(preTime - nowTime > 0){
			   				let time = (preTime - nowTime) / 1000;
			   				let day = parseInt(time / (60 * 60 * 24));
			   				let hou = parseInt(time % (60 * 60 * 24) / 3600);
			   				let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
			   				let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
			   				obj = {
			   					day: day<10?'0'+day:day,
			   					hou: hou<10?'0'+hou:hou,
			   					min: min<10?'0'+min:min,
			   					sec: sec<10?'0'+sec:sec
			   				};
			   				this.countTime = (obj.day != '00' ? obj.day + '天' : '') + obj.hou + ':' + obj.min + ':' + obj.sec
			   			} else {
							this.isStart = true
			   				clearInterval(this.countTime)
			   			}  
			   		},1000)
			   	}else{
			   		this.isStart = true
			   	}
		   },
			toUrl(url) {
				uni.navigateTo({
				  url: url
				})
			},
			subtract(value,index){
				if(value >= 1){
					this.rushList[index].soldNum -=1
				}
			},
			add(value,index){
				this.rushList[index].soldNum +=1
			},
			openRush() {
				this.isSuccess = true
				this.$refs.rush.open()
			},
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close() {
				this.$refs.rush.close()
			},
	

        },
        onShow(){
            this.$store.dispatch('WatchTabbar')
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
		background: #F5F5F5;
		position: relative;
	}
    .header{
		width: 100%;
		position: relative;
		.header-con{
			width: 100%;
			padding: 0 30rpx;
			padding-bottom: 100rpx;
			position: relative;
			height: 500rpx;
		}
        .title{
			width: 100%;
			z-index: 999;
			position: fixed;
			top: 0;
			left: 0;
            font-size: 37rpx;
            font-weight: 500;
            color: #FFFFFF;
			display: flex;
			align-items: center;
			.title-text{
                color: #FFFFFF;
            }
			background: linear-gradient(180deg, #EE7C5A 0%, #F18E5F 100%);
        }
	}

	.con-box{
		width: calc(100% - 48rpx);
		min-height: 847rpx;
		margin: 0 24rpx;
		padding: 24rpx;
		background: #FFFFFF;
		border-radius: 10px;
		margin-top: -60rpx;
		margin-bottom: 30rpx;
		z-index: 1;
		.title-con{
			padding: 30rpx 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.title-left{
				font-size: 32rpx;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 600;
				color: #222222;
			}
			.title-right{
				display: flex;
				align-items: center;
				
				text{
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #222222;
				}
				.back-right{
					font-size: 20rpx;
					margin-left: 8rpx;
					font-weight: 700;
				}
			}
		}
		
		.rush-list{
			.rush-item{
				padding: 30rpx 0;
				display: flex;
				align-items: stretch;
				justify-content: space-between;
				border-bottom: 1px solid #DDDDDD;
				
				.rush-left{
					display: flex;
					align-items: center;
					
					image{
						width: 140rpx;
						height: 140rpx;
						border-radius: 14rpx;
						margin-right: 20rpx;
					}
					
					.rush-con{
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.title-name{
							font-size: 32rpx;
							max-width: 300rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							margin-bottom: 30rpx;
						}
						.title-price{
							font-size: 26rpx;
							font-family: DINAlternate-Bold, DINAlternate;
							font-weight: bold;
							color: #FF4401;
							margin-bottom: 24rpx;
						}
						.title-num{
							font-size: 26rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #909090;
						}
					}
				}
				
				.rush-right{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-end;
					
					.sold-out{
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FF4141;
					}
					.dis-add{
						width: 80rpx;
						height: 80rpx;
					}
					
					.calculate{
						display: flex;
						align-items: center;
						image{
							width: 80rpx;
							height: 80rpx;
						}
						input{
							width: 50rpx;
							height: 84rpx;
							text-align: center;
							font-size: 32rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #222222;
						}
					}
				}
			}
		}
		
		.buy-btn{
			width: 100%;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #FF4141;
			border-radius: 40rpx;
			margin-top: 30rpx;
			margin-bottom: 60rpx;
			
			.text{
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				
			}
			.time{
				margin-left: 10rpx;
			}
		}
		.buy-btn.sold-out{
			color: #FFFFFF;
			background: #C2C2C2;
		}
		
		.have-buy{
			display: flex;
			align-items: stretch;
			
			.index{
				font-size: 26rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #909090;
				margin-right: 10rpx;
			}
			image{
				width: 40rpx;
				height: 40rpx;
				border-radius: 50%;
				margin-right: 10rpx;
			}
			.buy-con{
				display: flex;
				flex-direction: column;
				margin-bottom: 30rpx;
				.buy-title{
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
					text{
						font-size: 26rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
					}
					.buy-name{
						max-width: 300rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-right: 10rpx;
					}
				}
				.buy-rank{
					font-size: 30rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #222222;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
				}
			}
		}
		.more{
			padding: 40rpx 0;
			border-top: 1px solid #DDDDDD;
			text-align: center;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #646464;
		}
	}
	.dialog-box{
		width: 580rpx;
		height: 298rpx;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
		border-radius: 20rpx;
		overflow: hidden;
		.success,.faild{
			width: 580rpx;
			height: 298rpx;
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 60rpx;
		}
		.title{
			font-size: 34rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #222222;
			margin-bottom: 30rpx;
		}
		.title-message{
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #646464;
		}
		.btn{
			width: 100%;
			height: 84rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			position: absolute;
			bottom: 0;
			left: 0;
			.cancel,.ok{
				width: 50%;
				height: 84rpx;
				text-align: center;
				line-height: 84rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(34, 34, 34, 0.7);
			}
			.ok{
				background: #FF4141;
				color: #FFFFFF;
			}
		}
		
		.faild-btn{
			width: 100%;
			height: 84rpx;
			text-align: center;
			line-height: 84rpx;
			background: #FFFFFF;
			position: absolute;
			bottom: 0;
			left: 0;
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #FF4141;
		}
	}

   

</style>
