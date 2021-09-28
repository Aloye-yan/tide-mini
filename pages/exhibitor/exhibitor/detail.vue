<template>
	<view class="content">
        <view class="header" ref="header">
			<view class="header-con">
				<view class="title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<text class='iconfont back-left title-text' @tap="goBack()"></text>
				</view>
				<view class="detail-title" :style="[{'paddingTop': customBarH + statusBarH + 'px'}]">
					<image class="detail-img" src="../../../static/image/lining.png" mode="aspectFill"></image>
					<view class="title-con">
						<text class="name">{{exhibitInfo.name}}</text>
						<text class="booth">展位号：{{exhibitInfo.booth}}</text>
						<text class="parise">浏览数：{{exhibitInfo.praiseNum}}</text>
					</view>
				</view>
				<view class="tag-list">
					<text v-for="(item,index) in tagList" :key="index">{{item}}</text>
				</view>
			</view>
        </view>
		
		<view class="con-box">
			<view class="introduction">
				<text class="title-name">企业介绍</text>
				<text class="introduction-text" :style="[{'display':isUnfold ? 'block' : '-webkit-box'}]">{{exhibitInfo.introduction}}</text>
				<text class="unfold" @tap="isUnfold = !isUnfold">{{isUnfold?'收起':'查看全部'}} <text class="iconfont select"></text></text>
				<view class="video-con">
					<image class="image" src="../../../static/image/head.png" mode="aspectFill"></image>
					<image class="img-icon" src="../../../static/image/play.png" mode="aspectFill"></image>
				</view>
				<view class="bannerbox">
					<swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500" next-margin="230"
						previous-margin="30rpx">
						<swiper-item v-for="(i, index) of bannerList" :key="index" class="swiper-item">
							<image class="img" mode="aspectFill" :src="i.src"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
			
			<view class="popularity">
				<view class="popularity-title">
					<text class="title-name">企业人气</text>
					<text class="num">{{exhibitInfo.popularityNum}}</text>
				</view>
				<view class="person">
					<view class="image" v-for="(item,index) in bannerList" :key="index">
						<image :src="item.src" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottom-btn" v-if="!showPopup">
			<view class="btn-left" @tap="openSelectDate()">
				<image src="../../../static/image/invites.png" mode="aspectFill"></image>
				<text>线下邀约</text>
			</view>
			<view class="btn-right" @tap="openMessage()">
				<image src="../../../static/image/inquiry.png" mode="aspectFill"></image>
				<text>在线询盘</text>
			</view>
		</view>
		
		<view class="right-box" v-if="!showPopup">
			<view class="item-tab" v-for="(item,index) in tabList" :key="index" @click="toUrl(item.pagePath)">
				<image :src="item.iconPath" mode="aspectFill"></image>
				<text>{{item.text}}</text>
			</view>
		</view>
		
		<uni-popup ref="selectDate" type="bottom"  @maskClick="cancel()">
		    <view  class="popup-bottom">
				<view class="select-date">
					<text class="date-title">选择日期</text>
					<view class="date-con">
						<text class="item-date" :class="selectDate==item?'date-sec':''" v-for="(item,index) in dateList" :key="index" @click="selectDate = item">{{item}}</text>
					</view>
				</view>
				<view class="select-time">
					<text class="date-title">选择时间段</text>
					<view class="date-con">
						<text class="item-date" :class="selectTime==item?'date-sec':''" v-for="(item,index) in timeList" :key="index" @click="selectTime = item">{{item}}</text>
					</view>
				</view>
				<view class="popup-btn">
					<view class="cancel" @click="cancel()">取消</view>
					<view class="submit">提交</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="message" type="bottom" @maskClick="cancel()">
		    <view  class="popup-bottom">
				<view class="select-date">
					<text class="date-title">留言</text>
					<view class="message-con">
						<textarea class="textarea" v-model="messageText" placeholder="请输入" placeholder-class="placeholder-class"></textarea>
					</view>
				</view>
				<view class="popup-btn">
					<view class="cancel" @click="cancel()">取消</view>
					<view class="submit">提交</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import '@/static/icon/icon.scss'
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
                customBarH: this.customBar,
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
				tagList:['国潮','新消费','新科技'],
				bannerList:[
					{
						src:require('@/static/image/head.png')
					},{
						src:require('@/static/image/head.png')
					},{
						src:require('@/static/image/head.png')
					},{
						src:require('@/static/image/head.png')
					},{
						src:require('@/static/image/head.png')
					},{
						src:require('@/static/image/head.png')
					},{
						src:require('@/static/image/head.png')
					},{
						src:require('@/static/image/head.png')
					},{
						src:require('@/static/image/head.png')
					}
				],
				tabList: [{
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
				}],
				dateList:['9月29','9月30','10月30'],
				selectDate:'',
				timeList:['上午09:00～12:00','下午13:00～17:00'],
				selectTime:'',
				isUnfold:false,
				showPopup:false,
				messageText:''
				
			}
        },
		watch: {
			messageText(txt) {
				if( txt.indexOf('\n') != -1 ){ //敲了回车键了
				   uni.hideKeyboard() //收起软键盘
				}
			}
		},
        mounted(){
            
        },
		onReachBottom() {
			
		},
		methods: {
			goBack(){
				uni.navigateBack()
			},
            /**
             * 数字单位转换
             * @param {Object} value
             */
            bigNumberTransform (value) {
              const newValue = ['', '', '']
              let fr = 1000
              let num = 3
              let text1 = ''
              let fm = 1
              while (value / fr >= 1) {
                fr *= 10
                num += 1
              }
              if (num <= 8) { // 万
                text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万'
                fm = text1 === '万' ? 10000 : 10000000
                if (value % fm === 0) {
                  newValue[0] = parseFloat(value / fm).toFixed(2) + ''
                } else {
                  newValue[0] = parseFloat(value / fm).toFixed(1) + ''
                }
                newValue[1] = text1
              }
              if (value < 1000) {
                newValue[0] = value + ''
                newValue[1] = ''
              }
              return newValue.join('')
            },
			toUrl(url) {
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
			},
			openSelectDate(){
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.selectDate.open()
				this.showPopup = true
				this.selectDate = this.dateList[0]
				this.selectTime = this.timeList[0]
			},
			openMessage(){
				this.showPopup = true;
				this.$refs.message.open()
				this.messageText=''
			},
			cancel(){
			    this.$refs.selectDate.close()
				this.$refs.message.close()
				this.showPopup = false
				this.selectDate = this.dateList[0]
				this.selectTime = this.timeList[0]
				this.messageText = ''
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
		min-height: calc(100vh - 96rpx);;
		display: flex;
		flex-direction: column;
		background: #F5F5F5;
		position: relative;
		padding-bottom: 96rpx;
	}
    .header{
		width: 100%;
		position: relative;
		.header-con{
			width: 100%;
			padding: 0 30rpx;
			background: linear-gradient(180deg, #EE7C5A 0%, #FABE6F 100%);
			padding-bottom: 100rpx;
			position: relative;
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

        .detail-title{
            display: flex;
            align-items: center;
			
			.detail-img{
				width: 120rpx;
				height: 120rpx;
				border-radius: 14rpx;
				margin-right: 20rpx;
			}
            
            .title-con{
				display: flex;
				flex-direction: column;                
				
				text{
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					max-width: 300rpx;
					margin-top: 12rpx;
				}
				
				.name{
					font-size: 40rpx;
					font-weight: 600;
					max-width: 300rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					margin-top: 0;
				}
            }
			
        }
		
		.tag-list{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			
			text{
				height: 32rpx;
				line-height: 32rpx;
				text-align: center;
				padding: 0 12rpx;
				background: #FCE6D2;
				border-radius: 8rpx;
				color: #EF835C;
				font-size: 24rpx;
				margin-right: 10rpx;
				margin-top: 10rpx;
			}
		}
	}

	.con-box{
		width: 100%;
		margin-bottom: 20rpx;
		padding: 24rpx;
		margin-top: -70rpx;
		z-index: 1;
		.introduction{
			padding: 24rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			display: flex;
			flex-direction: column;
			margin-bottom: 20rpx;
			
			.title-name{
				font-size: 32prx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #222222;
				margin-bottom: 12rpx;
			}
			
			.introduction-text{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #222222;
				line-height: 50rpx;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 4;
			}
			
			.unfold{
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FF4141;
				margin-bottom: 30rpx;
				.select{
					font-size: 20rpx;
					color: #FF4141;
					margin-left: 4rpx;
				}
				
			}
			
			.video-con{
				width: 100%;
				position: relative;
				margin-bottom: 18rpx;
				
				.image{
					width: 100%;
					height: 320rpx;
					border-radius: 14rpx;
				}
				
				.img-icon{
					position: absolute;
					width: 80rpx;
					height: 80rpx;
					left: calc(50% - 40rpx);
					top: calc(50% - 40rpx);
				}
			}
			
			.bannerbox {
				width: 100%;
				
				.swiper {
					height: 170rpx;
					margin-bottom: 26rpx;
				}
				
				.swiper-item{
					width: unset !important;
					height: unset !important;
					.img {
						display: block;
						height: 168rpx;
						width: 168rpx;
						border-radius: 24rpx;
						margin-right: 18rpx;
					}
				}
			}
		}
		
		.popularity{
			padding: 24rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			
			.popularity-title{
				display: flex;
				align-items: center;
				margin-bottom: 24rpx;
				
				.title-name{
					font-size: 32rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #222222;
				}
				
				.num{
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909090;
					margin-left: 18rpx;
				}
			}
			
			.person{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				width: calc(100% + 24rpx);
				.image{
					margin-bottom: 18rpx;
					margin-right: 24rpx;
					image{
						width: 88rpx;
						height: 88rpx;
						border-radius: 50%;
						
					}
				}
			}
		}
	}
	
	.bottom-btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 96rpx;
		display: flex;
		align-items: center;
		z-index: 999;
		
		.btn-left,.btn-right{
			width: 50%;
			height: 96rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			display: flex;
			align-items: center;
			justify-content: center;
			
			image{
				width: 44rpx;
				height: 44rpx;
				margin-right: 10rpx;
			}
		}
		
		.btn-left{
			background: #FFFFFF;
			text{
				color: #FF4141;
			}			
		}
		
		.btn-right{
			background: #FF4141;
			text{
				color: #FFFFFF;
			}
		}
	}
	
	.right-box{
		position: fixed;
		right: 0;
		top: 30%;
		z-index: 999;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 24rpx;
		background: rgba(255, 255, 255, 0.78);
		border-radius: 44rpx;
		.item-tab{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 48rpx;
			image{
				width: 44rpx;
				height: 44rpx;
			}
			text{
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #222222;
			}
		}
	}
	
	.popup-bottom{
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0px 0px;
		border: 1px solid #979797;
		padding: 30rpx;
		
		.select-date,.select-time{
			.date-title{
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #222222;
				margin-bottom: 24rpx;
				display: block;
			}
			
			.date-con{
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				.item-date{
					width: 214rpx;
					height: 60rpx;
					text-align: center;
					line-height: 60rpx;
					background: #F5F5F5;
					border-radius: 30rpx;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #222222;
					border: 1px solid #F5F5F5;
				}
				
				.date-sec{
					background: #FFEFEF;
					border: 1px solid #FF4141;
				}
			}
		}
		
		.select-time{
			margin-top: 40rpx;
			.item-date{
				width: 330rpx !important;
			}
		}
		.message-con{
			.textarea{
				width: calc(100% - 40rpx);
				background: #F5F5F5;
				border-radius: 10rpx;
				border: 1px rsolid #E0E0E0;
				padding: 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #222222;
			}
			.placeholder-class{
				font-size: 28rpx;
				color: #909090;
			}
		}
		
		.popup-btn{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 60rpx;
			
			.cancel,.submit{
				width: 330rpx;
				height: 80rpx;
				border-radius: 40px;
				border: 1px solid #BCBCBC;
				text-align: center;
				line-height: 80rpx;
				font-size: 32rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				background: #FFFFFF;
				color: #646464;
				border-radius: 40rpx;
				border: 1px solid #BCBCBC;
			}
			
			.submit{
				color: #FFFFFF;
				background: #FF4141;
				border: 1px solid #FF4141;
				margin-left: 30rpx;
			}
			
		}
	}
   

</style>
