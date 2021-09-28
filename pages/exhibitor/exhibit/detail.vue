<template>
	<view class="content">
        <view class="header" ref="header">
			<view class="header-con">
				<view class="title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<text class='iconfont back-left title-text' @tap="goBack()"></text>
				</view>
			</view>
        </view>
		
		<view class="con-box">
			<view class="exhibits">
				<view class="exhibits-img">
					<image v-if="isVideo" :src="exhibitInfo.video" mode="aspectFill" class="video"></image>
					<image v-if="isVideo" src="../../../static/image/play.png" mode="aspectFill" class="play"></image>
					<image v-else :src="exhibitInfo.img" mode="aspectFill" class="video"></image>
					<view class="btn-con">
						<text :class="isVideo ? 'is-select' :''" @click="isVideo = true">视频</text>
						<text :class="!isVideo ? 'is-select' :''" @click="isVideo = false">图片</text>
					</view>
				</view>
				<text class="exhibitsName">{{exhibitInfo.name}}</text>
				<view class="tag-list">
					<text v-for="(item,indx) in tagList" :key="index">{{item}}</text>
				</view>
				
				<view class="coupon">
					<view class="coupon-left">
						<text class="coupon-text" v-for="(item,index) in couponList" :key="index">{{item}}</text>
					</view>
					<view class="coupon-right" @click="openCoupon()">
						<text>领券</text>
						<image src="../../../static/image/right3.png" mode="aspectFill"></image>
					</view>
				</view>
				
				<view class="oprea">
					<view class="browse">
						<image src="../../../static/image/eye.png" mode="aspectFill"></image>
						<text>{{bigNumberTransform(exhibitInfo.browseNum)}}</text>
					</view>
					<view class="oprea-right">
						<view class="parise" @click="exhibitInfo.isParise = !exhibitInfo.isParise">
							<image v-if="exhibitInfo.isParise" src="../../../static/image/praise_a.png" mode="aspectFill"></image>
							<image v-else src="../../../static/image/praise.png" mode="aspectFill"></image>
							<text>点赞</text>
						</view>
						<view class="share">
							<image src="../../../static/image/share2.png" mode="aspectFill"></image>
							<text>分享</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="introduction">
				<text class="introduction-text" :style="[{'display':isUnfold ? 'block' : '-webkit-box'}]">{{exhibitInfo.introduction}}</text>
				<text class="unfold" @tap="isUnfold = !isUnfold">{{isUnfold?'收起':'查看全部'}} <text class="iconfont select"></text></text>
			</view>
			
			<view class="exhibitor">
				<text class="titles">相关展商</text>
				<view class="exhibitor-con" @click="toUrl('/pages/exhibitor/exhibitor/detaillist?id='+exhibitInfo.id)">
					<image :src="exhibitInfo.img" mode="aspectFill"></image>
					<view class="exhibitor-right">
						<text class="title-name">{{exhibitInfo.name}}</text>
						<text>展品：{{exhibitInfo.num}}件</text>
						<text class="booth">展位：{{exhibitInfo.booth}}</text>
					</view>
				</view>
			</view>
			
			<view class="popularity">
				<view class="popularity-title">
					<text class="title-name">展品人气</text>
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
			<view class="btn-left">
				<view class="cllect" @click="exhibitInfo.isCollect = !exhibitInfo.isCollect">
					<image v-if="exhibitInfo.isCollect" src="../../../static/image/collection_a.png" mode="aspectFill"></image>
					<image v-else src="../../../static/image/collection.png" mode="aspectFill"></image>
					<text>收藏</text>
				</view>
				<view class="cllect" @tap="openMessage()">
					<image src="../../../static/image/message.png" mode="aspectFill"></image>
					<text>产品留言</text>
				</view>
			</view>
			<view class="btn-right" @tap="openOrder()">
				<text>意向订单</text>
			</view>
		</view>
		
		<uni-popup ref="order" type="bottom" @maskClick="cancel()">
		    <view  class="popup-bottom order-popup" :style="{marginBottom:marginBottom+'px'}">
				<view class="order-title">意向订单</view>
				<view class="order-con">
					<image :src="exhibitInfo.img" mode="aspectFill"></image>
					<view class="order-right">
						<text class="order-name">{{exhibitInfo.name}}</text>
						<view class="calculate">
							<view class="operator" @click="subtract()">-</view>
							<input type="number" v-model="exhibitorForm.calculateNum"/>
							<view class="operator" @click="add()">+</view>
						</view>
					</view>
				</view>
				<view class="exhibit-info">
					<text class="label">联系人</text>
					<input type="text" v-model="exhibitorForm.personName" placeholder="请输入" placeholder-class="placeholder-class"/>
				</view>
				<view class="exhibit-info">
					<text class="label">联系电话</text>
					<input type="text" v-model="exhibitorForm.phone" placeholder="请输入" placeholder-class="placeholder-class"/>
				</view>
				<view class="exhibit-info">
					<text class="label">公司名称</text>
					<input type="text" v-model="exhibitorForm.companyName" placeholder="请输入" placeholder-class="placeholder-class"/>
				</view>
				<view class="exhibit-info">
					<text class="label">需求描述</text>
					<input type="text" v-model="exhibitorForm.requirement" placeholder="请输入" placeholder-class="placeholder-class"/>
				</view>
				<view class="popup-btn">
					<view class="submit">确定</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="message" type="bottom" @maskClick="cancel()">
		    <view  class="popup-bottom" :style="{marginBottom:marginBottom+'px'}">
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
		
		<uni-popup ref="coupon" type="bottom" @maskClick="cancel()">
			<view  class="popup-bottom coupon-popup">
				<view class="coupon-title">
					<text class="iconfont icon-close"@click="cancel()"></text>
					<text>优惠券</text>
				</view>
				<text class="title-coupon">领取优惠券</text>
				<view class="cont-list-box" v-for="(item , index) in goodsList" :key="index">
					<view @click="toUrl('/pages/user/coupon/detail?type='+item.type+'&status='+item.status)" v-if="item.status == 'unused'" class="cont-item"
					:style="[item.type == '1' ? {backgroundImage:`url(${redbackground})`} : item.type == '2' ? {backgroundImage:`url(${yellowbackground})`}: {backgroundImage:`url(${greybackground})`}]"
					>
						<view class="cont-item-left">{{item.type == '1'? ('￥' + item.money) : item.money}}</view>
						<view class="cont-item-right" >
							<view class="cont-item-top">
								<view class="ticket">{{item.type=='1'?'满减券':'折扣券'}}</view>
								<view class="moneyuse">{{item.moneyuse}}</view>
							</view>
							<view class="cont-item-bottom">有效期{{item.time}}</view>
							<view class="cont-item-bottom used" @click.stop="openCouponDetail(item)">查看明细></view>
						</view>
						<view class="con-item-btn" :class="item.type=='2'?'type2':''">立即领取</view>
						<view class="residue" v-if="item.residue && item.residue > 0" :class="(item.type=='1' && !item.isGet)?'type1':(item.type=='2' && !item.isGet) ?'type2':''">剩{{item.residue}}张</view>
						<view class="is-get" v-if="item.isGet">已领取</view>
					</view>
					
					<view @click="toUrl('/pages/user/coupon/detail?type='+item.type+'&status='+item.status)" v-if="item.status == 'used'" class="cont-item" :style="[{backgroundImage:`url(${greybackground})`}]">
						<view class="cont-item-left">{{item.type == '1'? ('￥' + item.money) : item.money}}</view>
						<view class="cont-item-right" >
							<view class="cont-item-top">
								<view class="ticket used">{{item.type=='1'?'满减券':'折扣券'}}</view>
								<view class="moneyuse used">{{item.moneyuse}}</view>
							</view>
							<view class="cont-item-bottom used">有效期{{item.time}}</view>
							<view class="cont-item-bottom used" @click.stop="openCouponDetail(item)">查看明细></view>
						</view>
						<view class="con-item-btn used" >已错过</view>
						<view class="residue" v-if="item.residue && item.residue > 0" :class="(item.type=='1' && !item.isGet)?'type1':(item.type=='2' && !item.isGet) ?'type2':''">剩{{item.residue}}张</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="couponDetail" type="bottom" @maskClick="closeCouponDetail()">
			<view  class="popup-bottom coupon-popup coupon-detail">
				<view class="coupon-title">
					<text class="iconfont back-left" @click="closeCouponDetail()"></text>
					<text>优惠券明细</text>
				</view>
				<text class="title-coupon">{{taicketInfo.Fullminus}}</text>
				<text class="title-coupon-time">活动时间：{{taicketInfo.activeTime}}</text>
				<view class="info">{{taicketInfo.moneyuse}}</view>
				<view class="rank">
					<view class="rank-title">使用说明</view>
					<text>·该券可用日期为大会全部3天，每张券只能使用一次</text>
					<text>·该券不可赠予他人使用</text>
					<text>·该券一经兑换，概不退换，最终解释权归大会所有</text>
					<text>·使用该券时，请向工作人员核销该券码信息</text>
				</view>
			</view>
		</uni-popup>
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
                isVideo:true,
				exhibitInfo:{
					name:'中国李宁',
					booth:'E.12',
					browseNum:3543,
					collectNum:7865,
					praiseNum:767,
					popularityNum:768,
					isParise:true,
					num:11,
					isCollect:false,
					video:require('@/static/image/head.png'),
					img:require('@/static/image/head.png'),
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
				tagList:['工业电子','PCB焊接和链接技术(焊接技术、点胶注胶'],
				couponList:['满2000减100','200元大礼包'],
				isUnfold:false,
				showPopup:false,
				messageText:'',
				exhibitorForm:{
					calculateNum:0,
					requirement:'',
					personName:'',
					phone:'',
					companyName:'',
					marginBottom:'0'
				},
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
						time:'2019.09.10-2019.09.20',
						isGet:true,
						activeTime:'2021.09.12 18:44:00 - 2021.09.14 18:30:00',
						
					},{
						status:'unused',
						type:'2',
						money:'100',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						time:'2019.09.10-2019.09.20',
						code:'55QQK87412',
						residue:2,
						isGet:true,
						activeTime:'2021.09.12 18:44:00 - 2021.09.14 18:30:00',
						
					},{
						status:'used',
						money:'100',
						type:'1',
						Fullminus:'满减卷',
						moneyuse:'满2000使用',
						offcode:'核销码',
						code:'55QQK87412',
						time:'2019.09.10-2019.09.20',
						activeTime:'2021.09.12 18:44:00 - 2021.09.14 18:30:00',
						
					},{
						status:'used',
						money:'100',
						type:'1',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						code:'55QQK87412',
						time:'2019.09.10-2019.09.20',
						activeTime:'2021.09.12 18:44:00 - 2021.09.14 18:30:00',
						residue:5,
						isGet:false,
						
					},{
						status:'used',
						money:'100',
						type:'2',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						code:'55QQK87412',
						time:'2019.09.10-2019.09.20',
						activeTime:'2021.09.12 18:44:00 - 2021.09.14 18:30:00',
						residue:11,
						isGet:true
						
					},{
						status:'used',
						money:'100',
						type:'2',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						code:'55QQK87412',
						time:'2019.09.10-2019.09.20',
						activeTime:'2021.09.12 18:44:00 - 2021.09.14 18:30:00',
						isGet:false,
						
					},{
						status:'used',
						money:'100',
						type:'2',
						Fullminus:'折扣卷',
						moneyuse:'指定商品9.5折',
						offcode:'核销码',
						code:'55QQK87412',
						time:'2019.09.10-2019.09.20',
						activeTime:'2021.09.12 18:44:00 - 2021.09.14 18:30:00',
						isGet:false,
						
					}
				],
				taicketInfo:{}
				
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
			openOrder(){
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.order.open()
				this.showPopup = true
			},
			openMessage(){
				this.showPopup = true;
				this.$refs.message.open()
				this.messageText=''
			},
			openCoupon(){
				this.showPopup = true;
				this.$refs.coupon.open()
			},
			cancel(){
			    this.$refs.order.close()
				this.$refs.message.close()
				this.$refs.coupon.close()
				this.showPopup = false
				this.messageText = ''
			},
			subtract(){
				if(this.exhibitorForm.calculateNum >= 1){
					this.exhibitorForm.calculateNum -= 1
				}
			},
			add(){
				this.exhibitorForm.calculateNum += 1
			},
			openCouponDetail(item){
				this.taicketInfo = item
				this.$refs.coupon.close()
				this.$refs.couponDetail.open()
				
			},
			closeCouponDetail(){
			    this.$refs.couponDetail.close()
				this.$refs.coupon.open()
				this.taicketInfo = {}
			},
			

        },
        onShow(){
            this.$store.dispatch('WatchTabbar')
        },
		onLoad(){
		    uni.onKeyboardHeightChange(res => {  
		        this.marginBottom = res.height
		    })
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
		min-height: calc(100vh - 102rpx);;
		display: flex;
		flex-direction: column;
		background: #F5F5F5;
		position: relative;
		padding-bottom: 102rpx;
	}
    .header{
		width: 100%;
		position: relative;
		height: 160rpx;
		background: #FFFFFF;
		.header-con{
			width: 100%;
			padding: 0 30rpx;
			background: #FFFFFF;
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
			display: flex;
			align-items: center;
			.title-text{
                color: #222222;
            }
			background: #FFFFFF;
        }
		
	}

	.con-box{
		width: 100%;
		margin-bottom: 20rpx;
		
		.exhibits{
			width: 100%;
			background: #FFFFFF;
			padding: 30rpx;
			.exhibits-img{
				width: 100%;
				position: relative;
				margin-bottom: 30rpx;
				.video{
					width: 100%;
					position: relative;					
				}
				.play{
					position: absolute;
					width: 80rpx;
					height: 80rpx;
					left: calc(50% - 40rpx);
					top: calc(50% - 40rpx);
				}
				
				.btn-con{
					display: flex;
					align-items: center;
					position: absolute;
					bottom: 50rpx;
					left: calc(50% - 60rpx);
					
					text{
						width: 60rpx;
						height: 30rpx;
						background: #F5F5F5;
						border-radius: 15rpx;
						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #222222;
						line-height: 30rpx;
						text-align: center;
					}
					.is-select{
						color: #FFFFFF;
						background: #FF6A48;
					}
				}
			}
			
			.exhibitsName{
				display: block;
				font-size: 34rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #222222;
				max-width: 400rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				margin-bottom: 25rpx;
			}
			
			.tag-list{
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				margin-bottom: 26rpx;
				text{
					background: #F5F5F5;
					border-radius: 4rpx;
					padding: 5rpx 8rpx;
					font-size: 22rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #666666;
					margin-right: 10rpx;
				}
			}
			
			.coupon{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 36rpx;
				.coupon-left{
					display: flex;
					align-items: center;
					flex: 1;
					.coupon-text{
						margin-right: 20rpx;
						background: #FFEFEF;
						border-radius: 4rpx;
						padding: 5rpx 8rpx;
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FF4141;
					}
				}
				
				.coupon-right{
					display: flex;
					align-items: center;
					text{
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FF442E;
					}
					image{
						width:10rpx;
						height: 19rpx;
						margin-left: 17rpx;
						margin-top: 6rpx;
					}
				}
			}
			
			.oprea{
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				image{
					width: 30rpx;
					height: 30rpx;
					margin-right: 6rpx;
				}
				text{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909090;
				}
				
				.browse,.oprea-right,.parise,.share{
					display: flex;
					align-items: center;					
				}
				.parise,.share{
					justify-content: center;
				}
				.browse{
					image{
						width: 32rpx;
						height: 22rpx;
					}
				}
				.oprea-right{
					.parise,.share{
						width: 140rpx;
						height: 48rpx;
						background: #F5F5F5;
						border-radius: 28px;
					}
					.parise{
						margin-right: 30rpx;
					}
				}
				
			}
		}
				
		.introduction{
			padding: 30rpx;

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
		}
		
		.exhibitor{
			background: #FFFFFF;
			padding: 24rpx;
			border-radius: 20rpx;
			margin: 0 24rpx;
			margin-bottom: 20rpx;
			.titles{
				display: block;
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #222222;
				margin-bottom: 30rpx;
			}
			.exhibitor-con{
				display: flex;
				align-items: center;
				image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 14rpx;
					margin-right: 20rpx;
				}
				.exhibitor-right{
					flex: 1;
					display: flex;
					flex-direction: column;
					text{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
					}
					.title-name{
						margin-bottom: 12rpx;
						font-size: 30rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						max-width: 300rpx;
						color: #000000;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.booth{
						margin-top: 12rpx;
					}
				}
				
			}
		}
		
		
		
		.popularity{
			padding: 24rpx;
			background: #FFFFFF;
			border-radius: 20rpx;
			margin: 24rpx;
			
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
		height: 102rpx;
		display: flex;
		align-items: center;
		z-index: 999;
		
		.btn-left,.btn-right{
			height: 102rpx;
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
			width: 45%;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 58rpx;
			
			.cllect{
				display: flex;
				flex-direction: column;
				align-items: center;
				
				image{
					width: 44rpx;
					height: 44rpx;
					margin-bottom: 10rpx;
				}
			}
			text{
				font-size: 20rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #222222;
			}			
		}
		
		.btn-right{
			width: 55%;
			background: #FF442E;
			text{
				font-size: 32rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}
		}
	}
	
	.popup-bottom{
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0px 0px;
		border: 1px solid #979797;
		padding: 30rpx;
		
		.date-title{
			font-size: 30rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #222222;
			margin-bottom: 24rpx;
			display: block;
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
		
		.order-title{
			font-size: 30rpx;
			text-align: center;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #222222;
			padding: 24rpx 0;
			border-bottom: 1px solid #DDDDDD;
		}
		
		.order-con{
			display: flex;
			align-items: center;padding: 30rpx;
			border-bottom: 1px solid #DDDDDD;
			image{
				width: 140rpx;
				height: 140rpx;
				border-radius: 14rpx;
				margin-right: 20rpx;
			}
			
			.order-right{
				display: flex;
				flex-direction: column;
				flex: 1;
				.order-name{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #222222;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin-bottom: 20rpx;
				}
				.calculate{
					display: flex;
					align-items: center;
					.operator{
						width: 67rpx;
						height: 60rpx;
						text-align: center;
						line-height: 60rpx;
						background: #F5F5F5;
						border-radius: 8rpx 0px 0px 8rpx;
						color: #222222;
						font-size: 40rpx;
					}
					input{
						width: 122rpx;
						height: 60rpx;
						text-align: center;
						background: #F5F5F5;
						font-size: 34rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #222222;
						margin: 0 4rpx;
					}
				}
			}
		}
		
		.exhibit-info{
			padding: 30rpx;
			border-bottom: 1px solid #DDDDDD;
			display: flex;
			align-items: center;
			.label{
				width: 120rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #444444;
				margin-right: 56rpx;
			}
			input{
				flex: 1;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #222222;
			}
			.placeholder-class{
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #909090;
			}
		}
		
		.popup-btn{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 30rpx 0;
			
			.cancel,.submit{
				width: 100%;
				height: 80rpx;
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
	.order-popup{
		padding: 0;
		.popup-btn{
			.submit{
				margin-right: 30rpx;
			}
		}
		
	}
	
	.coupon-popup{
		max-height: calc(100vh - 400rpx);
		overflow-y: auto;
		.coupon-title{
			font-size: 30rpx;
			text-align: center;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #222222;
			padding: 24rpx 0;
			position: relative;
			.icon-close,.back-left{
				font-size: 32rpx;
				position: absolute;
				left: 0;
			}
		}
		.title-coupon{
			display: block;
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #646464;
			margin-bottom: 28rpx;
		}
		.cont-list-box{
			.cont-item {
				width: 100%;
				height: 155rpx;
				margin-bottom: 20rpx;
				padding-right: 20rpx;
				background-size: cover;
				display: flex;
				align-items: center;
				justify-content: space-between;
				position: relative;
				overflow: hidden;
				.cont-item-left{
					display: flex;
					align-items: center;
					justify-content: center;
					width: 30%;
					font-size: 34rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					margin-right: 30rpx;
				}
				
				.cont-item-right{
					flex: 1;
					display: flex;
					flex-direction: column;
					position: relative;
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
						font-size: 20rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #646464;
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
					z-index: 1;
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
				.residue{
					position: absolute;
					bottom: 0;
					right: 0;
					background: #FFEFEF;
					padding: 5rpx 10rpx;
					border-radius: 14rpx 0 0 0;
					color: #FF4141;
					font-size: 22rpx;
				}
				.residue.type1{
					background: #FF4141;
					color: #FFFFFF;
				}
				.residue.type2{
					background: #FFEAD4;
					color: #FF9828;
				}
				.is-get{
					width: 100rpx;
					height: 100rpx;
					color: #FF9828;
					text-align: center;
					line-height: 100rpx;
					border: 1px solid #FF9828;
					border-radius: 50%;
					position: absolute;
					top: -20rpx;
					right: -10rpx;
					font-size: 24rpx;
					transform:rotate(-18deg);
					-webkit-transform:rotate(-18deg);
					-moz-transform:rotate(-18deg);
				}
			}
		}
	}
	.coupon-detail{
		.title-coupon{
			font-size: 28rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #222222;
			padding-bottom: 20rpx;
			border-bottom: 1px dashed #DDDDDD;
		}
		.title-coupon-time{
			display: block;
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #646464;
			margin-bottom: 34rpx;
		}
		.info{
			height: 104rpx;
			line-height: 104rpx;
			text-align: center;
			background: #FFEFEF;
			border-radius: 8rpx;
			font-size: 36rpx;
			font-family: PingFangSC-Semibold, PingFang SC;
			font-weight: 600;
			color: #FF4141;
			margin-bottom: 20rpx;
		}
		.rank{
			background: #F5F5F5;
			border-radius: 8rpx;
			padding: 24rpx;
			.rank-title{
				font-size: 30rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #222222;
				margin-bottom: 50rpx;
			}
			text{
				font-size: 24rpx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #222222;
				line-height: 24rpx;
			}
		}
	}
   

</style>
