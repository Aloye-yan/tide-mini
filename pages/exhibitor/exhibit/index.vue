<template>
	<view>
		<view class="hot-exhibit">
			<text class="exhibit-title">热门展品</text>
			<view class="hot-exhibit-con">
				<view class="hot-exhibit-item" v-for="(item,index) in hotExhibit" :key="index" @click="toUrl('/pages/exhibitor/exhibit/detail')">
					<image :src="item.src" mode="aspectFill"></image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		
		<view class="all-exhibit">
			<text class="exhibit-title">所有展品</text>
			<view class="all-exhibit-con">
				<view class="all-exhibit-item" v-for="(item,index) in allExhibit" :key="index" @click="toUrl('/pages/exhibitor/exhibit/detail')">
					<view class="item-left">
						<image class="img" :src="item.src" mode="aspectFill"></image>
						<view class="item-con">
							<text class="item-title">{{item.title}}</text>
							<text class="item-name">{{item.name}}</text>
							<view class="item-view">
								<image src="../../../static/image/eye.png" mode="aspectFill"></image>
								<text>{{bigNumberTransform(item.viewNum)}}</text>
							</view>
						</view>
					</view>
					<view class="item-right">
						<text class="booth">展位：{{item.booth}}</text>
						<view class="right-item">
							<view class="praise collection" @click.stop="changePaise(item,index)">
								<image v-if="item.isPraise" src="../../../static/image/praise_a.png" mode="aspectFill"></image>
								<image v-else src="../../../static/image/praise.png" mode="aspectFill"></image>
								<text>{{item.praise}}</text>
							</view>
							<view class="collection" @click.stop="changeCollect(item,index)">
								<image v-if="item.isCollect" src="../../../static/image/collection_a.png" mode="aspectFill"></image>
								<image v-else src="../../../static/image/collection.png" mode="aspectFill"></image>
								<text>{{item.praise}}</text>
							</view>
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
		props:{
			keyword:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				hotExhibit:[
					{
						title:'中国李宁',
						src:require('@/static/image/head.png')
					},{
						title:'元气森林',
						src:require('@/static/image/head.png')
					},{
						title:'安踏',
						src:require('@/static/image/head.png')
					},{
						title:'新百伦',
						src:require('@/static/image/head.png')
					},{
						title:'鸿星尔克',
						src:require('@/static/image/head.png')
					},{
						title:'农夫山泉',
						src:require('@/static/image/head.png')
					},{
						title:'中国李宁',
						src:require('@/static/image/head.png')
					},{
						title:'中国李宁',
						src:require('@/static/image/head.png')
					},{
						title:'中国李宁',
						src:require('@/static/image/head.png')
					}
				],
				allExhibit:[
					{
						title:'中国李宁',
						name:'透气跑鞋',
						viewNum:'4324',
						booth:'E3.4',
						praise:6,
						collect:23,
						isCollect:false,
						isPraise:false,
						src:require('@/static/image/head.png')
					},{
						title:'元气森林',
						name:'透气跑鞋',
						viewNum:'424',
						booth:'E3.4',
						praise:6,
						collect:23,
						isCollect:false,
						isPraise:false,
						src:require('@/static/image/head.png')
					},{
						title:'安踏',
						name:'透气跑鞋',
						viewNum:'8324',
						booth:'E3.4',
						praise:6,
						collect:23,
						isCollect:false,
						isPraise:false,
						src:require('@/static/image/head.png')
					},{
						title:'新百伦',
						name:'透气跑鞋',
						viewNum:'43204',
						booth:'E3.4',
						praise:6,
						collect:23,
						isCollect:false,
						isPraise:false,
						src:require('@/static/image/head.png')
					},{
						title:'鸿星尔克',
						name:'透气跑鞋',
						viewNum:'4324',
						booth:'E3.4',
						praise:6,
						collect:23,
						isCollect:false,
						isPraise:false,
						src:require('@/static/image/head.png')
					},{
						title:'农夫山泉',
						name:'透气跑鞋',
						viewNum:'64324',
						booth:'E3.4',
						praise:6,
						isCollect:true,
						isPraise:false,
						collect:23,
						src:require('@/static/image/head.png')
					},{
						title:'中国李宁',
						name:'透气跑鞋',
						viewNum:'4324',
						booth:'E3.4',
						praise:6,
						collect:23,
						isCollect:false,
						isPraise:false,
						src:require('@/static/image/head.png')
					},{
						title:'中国李宁',
						name:'透气跑鞋',
						viewNum:'4324',
						booth:'E3.4',
						praise:6,
						collect:23,
						isCollect:true,
						isPraise:false,
						src:require('@/static/image/head.png')
					},{
						title:'中国李宁',
						name:'透气跑鞋',
						viewNum:'4324',
						booth:'E3.4',
						isPraise:true,
						isCollect:false,
						praise:6,
						collect:23,
						src:require('@/static/image/head.png')
					}
				]
			}
		},
		mounted() {
			var that=this;
			uni.$on('onReachBottom', function(data) {
				console.log('onReachBottom');
				that.allExhibit.push({
					title:'中国李宁'+that.allExhibit.length,
					name:'透气跑鞋',
					viewNum:'4324',
					booth:'E3.4',
					isPraise:true,
					praise:6,
					collect:23,
					src:require('@/static/image/head.png')
				})
			});
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
			changePaise(item,index){
				this.allExhibit[index].isPraise = !item.isPraise
			},
			changeCollect(item,index){
				this.allExhibit[index].isCollect = !item.isCollect
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
			}
		}
	}
</script>

<style lang="scss">
	view{
		box-sizing: border-box;
	}
	text{
		color: #222222;
	}
	.hot-exhibit{
		padding: 24rpx 0;
		margin: 20rpx 0;
		background: #FFFFFF;
		border-radius: 20rpx;
		min-height: 280rpx;
		
		.hot-exhibit-con{
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			margin-top: 30rpx;
			
			.hot-exhibit-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex: 0 0 25%;
				margin-bottom: 24rpx;
				
				image{
					width: 120rpx;
					height: 120rpx;
					border-radius: 14rpx;
					margin-bottom: 12rpx;
				}
				
				text{
					font-size: 24rpx;
					font-family: PingFangSC-Regular, PingFang SC;					font-weight: 400;
					color: #666666;
				}
			}
		}
	}
	
	.exhibit-title{
		font-weight: 500;
		color: #222222;
		font-size: 28rpx;
		padding-left: 24rpx;
	}
	
	.all-exhibit{
		padding: 24rpx 0;
		margin: 20rpx 0;
		background: #FFFFFF;
		border-radius: 20rpx;
		min-height: 280rpx;
		
		.all-exhibit-con{
			.all-exhibit-item{
				display: flex;
				align-items: flex-end;
				justify-content: space-between;
				border-bottom: 1px solid #DDDDDD;
				padding: 30rpx 24rpx;
				
				.item-left{
					display: flex;
					align-items: center;
					
					.img{
						width: 120rpx;
						height: 120rpx;
						border-radius: 14rpx;
						margin-right: 20rpx;
					}
					
					.item-con{
						display: flex;
						flex-direction: column;
						max-width: 300rpx;
						
						.item-title{
							font-size: 30rpx;
							font-family: PingFangSC-Medium, PingFang SC;
							font-weight: 500;
							color: #000000;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							margin-bottom: 14rpx;
						}
						
						.item-name{
							font-size: 24rpx;
							font-family: PingFangSC-Regular, PingFang SC;
							font-weight: 400;
							color: #666666;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							margin-bottom: 14rpx;
						}
						
						.item-view{
							display: flex;
							align-items: center;
							
							image{
								width: 32rpx;
								height: 22rpx;
							}
							
							text{
								font-size: 24rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #909090;
							}
						}
					}
				}
				
				.item-right{
					display: flex;
					flex-direction: column;
					.booth{
						font-size: 24rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #666666;
						margin-bottom: 14rpx;
					}
					
					.right-item{
						display: flex;
						align-items: center;
						font-size: 26rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #222222;
						
						.collection{
							display: flex;
							align-items: center;
							border-left: 1px solid #DDDDDD;
							padding-left: 15rpx;
							margin-left: 15rpx;
							
							image{
								width: 30rpx;
								height: 30rpx;
								margin-right: 4rpx;
							}
						}
						
						.praise{
							border: none;
							margin: 0;
							padding: 0;
						}
					}
				}
			}
			.all-exhibit-item:last-child{
				border: none;
			}
		}
	}
	
</style>
