<template>
	<view class="content">
		<view class="nav-head">
			<view class="nav-title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
				<view class="title">
					<text class="iconfont back-left back" @tap="goBack()"></text>
					我的足迹
				</view>
			</view>	
		</view>
		<view class="con-list" v-for="(item,index) in dataList" :key="index">
			<view class="title">
				<text class="time">{{item.time}}</text>
				<view class="title-right" @click="delectAll(index)">
					<image src="../../../static/image/delete.png" mode=""></image>
					<text>清空</text>
				</view>
			</view>
			<view class="con-item" v-for="(goods,i) in item.goodsList" :key="i">
				<view class="goods-left">
					<image :src="goods.src" mode="aspectFill"></image>
					<view class="goods-con">
						<text class="title">{{goods.name}}</text>
						<view class="goods-num">
							<text> 展品：{{goods.num}}件</text>
							<text> 展位：{{goods.booth}}</text>
						</view>
					</view>
				</view>
				<image @click="changeCollect(index,i,goods.isCollect)" class="collect" v-if="goods.isCollect" src="../../../static/image/collection_a.png" mode="aspectFill"></image>
				<image @click="changeCollect(index,i,goods.isCollect)" class="collect" v-else src="../../../static/image/collection.png" mode="aspectFill"></image>
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
						goodsList:[
							{
								name:'鸿星尔克',
								src:require('@/static/image/erke.png'),
								booth:'E3.4',
								num:'11',
								isCollect:false
							},{
								name:'回力',
								src:require('@/static/image/huili.png'),
								booth:'E3.4',
								num:'11',
								isCollect:true
							},{
								name:'李宁',
								src:require('@/static/image/lining.png'),
								booth:'E3.4',
								num:'11',
								isCollect:true
							},{
								name:'安踏',
								src:require('@/static/image/shoes.png'),
								booth:'E3.4',
								num:'11',
								isCollect:false
							}
						]
					},{
						time:'9月14日',
						goodsList:[
							{
								name:'鸿星尔克',
								src:require('@/static/image/erke.png'),
								booth:'E3.4',
								num:'11',
								isCollect:true
							},{
								name:'安踏',
								src:require('@/static/image/shoes.png'),
								booth:'E3.4',
								num:'11',
								isCollect:false
							},{
								name:'回力',
								src:require('@/static/image/huili.png'),
								booth:'E3.4',
								num:'11',
								isCollect:true
							},{
								name:'李宁',
								src:require('@/static/image/lining.png'),
								booth:'E3.4',
								num:'11',
								isCollect:true
							}
						]
					}
				]
			}
		},
		methods:{
			goBack(){
				uni.navigateBack()
			},
			delectAll(index){
				this.dataList.splice(index,1)
			},
			changeCollect(index,i,isCollect){
				this.dataList[index].goodsList[i].isCollect = !isCollect
			}
		}
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
		background: #F5F5F5;
	}
	
	.nav-head{
		height: 280rpx;
		margin-bottom: -72rpx;
		background: #F5A266;
	}
	
	.nav-title{
		width: 100%;
		padding-left: 12rpx;
		position: fixed;
		z-index: 9999;
		text-align: center;
		background: linear-gradient(180deg, #EE7C5A 0%, #F5A266 100%);
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
	
	.con-list{
		padding: 30rpx;
		margin: 0 24rpx;
		border-radius: 10px;
		background: #FFFFFF;
		margin-bottom: 20rpx;
	}
	
	
	.con-list .title{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.con-list .title .time{
		font-weight: 600;
		color: #646464;
		font-size: 32rpx;
	}
	
	.con-list .title .title-right{
		display: flex;
		align-items: center;
	}
	
	.con-list .title .title-right image{
		width: 30rpx;
		height: 30rpx;
	}
	
	.con-list .title .title-right text{
		font-weight: 400;
		color: #333333;
		font-size: 24rpx;
	}
	
	.con-list .con-item{
		display: flex;
		align-items: center;
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
	
	.con-list .con-item .goods-left{
		display: flex;
		align-items: center;
		flex: 1;
	}
	
	.con-list .con-item .goods-left image{
		width: 88rpx;
		height: 88rpx;
		margin-right: 20rpx;
	}
	
	.con-list .con-item .goods-left .goods-con{
		display: flex;
		flex-direction: column;
	}
	
	.con-list .con-item .goods-left .title{
		max-width: 300rpx;
		font-weight: 500;
		color: #000000;
		font-size: 32rpx;
		margin-bottom: 12rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.con-list .con-item .goods-left .goods-num{
		display: flex;
		align-items: center;
	}
	
	.con-list .con-item .goods-left .goods-num text{
		margin-right: 20rpx;
		font-weight: 400;
		color: #666666;
		font-size: 24rpx;
	}

</style>
