<template>
	<view class="content">
		<view class="nav-head">
			<view class="nav-box">
				<view class="nav-title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<view class="title">
						<text class="iconfont back-left back" @tap="goBack()"></text>
						全部预售
					</view>
				</view>	
				<view class="nav">
				    <view v-for="(item,index) in tabList" :key="index" class="nav-item" @click="tabType = index">
				        <text>{{item}}</text>
				        <view v-if="tabType==index" class="Underline"></view>
				    </view>
				</view>
			</view>
		</view>
		<view class="con-list" v-for="(item,index) in dataList" :key="index">
			<view class="rush-item" v-if="item.isStart && (tabType == 0 || tabType == 1)">
				<view class="title">
					<text class="time">{{item.time}}</text>
				</view>
				<view class="con-item" v-for="(goods,i) in item.goodsList" :key="i">
					<image :src="goods.src" mode="aspectFill"></image>
					<view class="goods-con">
						<view class="goods-title">
							<view class="title-name">{{goods.name}}</view>
							<view class="sold-time">{{goods.soldTime}}开抢</view>
						</view>
						<view class="goods-price">
							<text>预售：</text>
							<text class="price">￥{{goods.price}}</text>
						</view>
						<view class="goods-num">
							<text>预售数量：{{goods.num}}件</text>
						</view>
					</view>
				</view>
			</view>
			<view class="rush-item" v-if="item.isStart && (tabType == 0 || tabType == 2)">
				<view class="title">
					<text class="time">{{item.time}}</text>
				</view>
				<view class="con-item" v-for="(goods,i) in item.goodsList" :key="i">
					<image :src="goods.src" mode="aspectFill"></image>
					<view class="goods-con">
						<view class="goods-title">
							<view class="title-name">{{goods.name}}</view>
							<view class="sold-time">预售结束</view>
						</view>
						<view class="goods-price">
							<text>预售：</text>
							<text class="price">￥{{goods.price}}</text>
						</view>
						<view class="goods-num">
							<text>预售数量：{{goods.num}}件</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import '@/static/icon/icon.scss'
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar,
				dataList: [
					{
						time:'9月14日',
						isStart:true,
						goodsList:[
							{
								name:'鸿星尔克',
								src:require('@/static/image/erke.png'),
								booth:'E3.4',
								num:'11',
								price:870,
								soldTime:'2021-09-02 10:00',
								isCollect:false
							},{
								name:'回力',
								src:require('@/static/image/huili.png'),
								booth:'E3.4',
								num:'11',
								price:870,
								soldTime:'2021-09-02 10:00',
								isCollect:true
							},{
								name:'李宁',
								src:require('@/static/image/lining.png'),
								booth:'E3.4',
								num:'11',
								price:870,
								soldTime:'2021-09-02 10:00',
								isCollect:true
							},{
								name:'安踏',
								src:require('@/static/image/shoes.png'),
								booth:'E3.4',
								num:'11',
								price:870,
								soldTime:'2021-09-02 10:00',
								isCollect:false
							}
						]
					},{
						time:'9月14日',
						isStart:false,
						goodsList:[
							{
								name:'鸿星尔克',
								src:require('@/static/image/erke.png'),
								booth:'E3.4',
								num:'11',
								price:870,
								soldTime:'2021-09-02 10:00',
								isCollect:true
							},{
								name:'安踏',
								src:require('@/static/image/shoes.png'),
								booth:'E3.4',
								num:'11',
								price:870,
								soldTime:'2021-09-02 10:00',
								isCollect:false
							},{
								name:'回力',
								src:require('@/static/image/huili.png'),
								booth:'E3.4',
								num:'11',
								price:870,
								soldTime:'2021-09-02 10:00',
								isCollect:true
							},{
								name:'李宁',
								src:require('@/static/image/lining.png'),
								booth:'E3.4',
								num:'11',
								price:870,
								soldTime:'2021-09-02 10:00',
								isCollect:true
							}
						]
					}
				],
				tabList:['全部','即将开始','已结束'],
				tabType:0,
			}
		},
		methods:{
			goBack(){
				uni.navigateBack()
			},
			getDataList(){
				let item = {
					time:'9月14日',
					isStart:false,
					goodsList:[
						{
							name:'鸿星尔克',
							src:require('@/static/image/erke.png'),
							booth:'E3.4',
							num:'11',
							price:870,
							soldTime:'2021-09-02 10:00',
							isCollect:true
						},{
							name:'安踏',
							src:require('@/static/image/shoes.png'),
							booth:'E3.4',
							num:'11',
							price:870,
							soldTime:'2021-09-02 10:00',
							isCollect:false
						}
					]
				}
				this.dataList.push(item)
			}
		},
		onReachBottom(){
			this.getDataList()
			console.log("触底了")
		},
		onPullDownRefresh(){
			this.getDataList()
			console.log("下拉刷新")
		}
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
		padding-left: 12rpx;
		text-align: center;
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
	
	
	.con-list{
		
		.rush-item{
			padding: 30rpx;
			margin: 0 24rpx;
			border-radius: 10px;
			background: #FFFFFF;
			margin-bottom: 20rpx;
		}
	}
	
	
	.con-list .title{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.con-list .title .time{
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #646464;
	}
	
	.con-list .con-item{
		display: flex;
		align-items: stretch;
		justify-content: space-between;
		border-bottom: 1px solid #DDDDDD;
		padding: 30rpx 0;
	}
	
	.content .con-list .con-item:last-child{
		border: none;
	}
	
	.con-list .con-item .collect{
		width: 30rpx;
		height: 30rpx;
	}
	
	.con-list .con-item image{
		width: 140rpx;
		height: 140rpx;
		margin-right: 20rpx;
	}
	
	.con-list .con-item .goods-con{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
	}
	
	.goods-con .goods-title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.title-name{
			font-size: 32rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: #000000;
			flex: 1;
			max-width: 180rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.sold-time{
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FF4141;
		}
	}
	.goods-price,.goods-num{
		display: flex;
		align-items: center;
		text{
			font-size: 26rpx;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #909090;
		}
		.price{
			font-size: 26rpx;
			font-family: DINAlternate-Bold, DINAlternate;
			font-weight: bold;
			color: #FF4401;
		}
	}
	

</style>
