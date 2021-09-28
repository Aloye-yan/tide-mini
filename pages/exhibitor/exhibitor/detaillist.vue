<template>
	<view class="content">
        <view class="header">
			<view class="header-con">
				<view class="title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<text class='iconfont back-left title-text' @tap="goBack()"></text>
				</view>
				<view class="detail-title">
					<view class="title-name">
						<text>{{exhibitInfo.name}}</text>
						<image src="../../../static/image/back-right.png" mode="aspectFill"></image>
					</view>
				    
					<view class="share-btn">
						<image src="../../../static/image/share.png" mode="aspectFill"></image>
						<text>分享</text>
					</view>
				</view>
				<view class="nav">
				    <view class="nav-item" >
				        <text class="num">{{exhibitInfo.booth}}</text>
				        <text class="name">展位号</text>
				    </view>
					<view class="nav-item" >
					    <text class="num">{{exhibitInfo.browseNum}}</text>
					    <text class="name">浏览数</text>
					</view>
					<view class="nav-item" >
					    <text class="num">{{exhibitInfo.collectNum}}</text>
					    <text class="name">收藏数</text>
					</view>
					<view class="nav-item" >
					    <text class="num">{{exhibitInfo.praiseNum}}</text>
					    <text class="name">点赞数</text>
					</view>
				</view>
			</view>
			
			<view class="con-title" :style="{top:titlePaddingTop+'px'}">
				<view class="con-titles">
					<text class="num">展品：{{dataList.length}}件</text>
					<view class="select-btn" @tap="showSelectType = !showSelectType">
						<image src="../../../static/image/select.png" mode="aspectFill"></image>
						<text>筛选</text>
					</view>
				</view>
				<view class="select-con" v-if="showSelectType">
					<text class="select-item" :class="selectActive == item.value?'select-active':''" v-for="(item,index) in selectList" :key="index" @tap="selectActive = item.value">{{item.text}}</text>
				</view>
			</view>
        </view>
		
		<view class="con-list" :style="{paddingTop:listPaddingTop+'px'}">
            <view class="left-list">
                <view class="con-item" v-for="(item,index) in dataList_left" :key="index" @click="toUrl('/pages/exhibitor/exhibitor/detail?id='+item.id)">
                    <view class="image">
                        <image :src="item.src" mode="aspectFill"></image>									
                    </view>
                    <text class="con-title">{{item.title}}</text>
                    <view class="con-item-con">
                        <view class="con-item-left">
                            <image src="../../../static/image/eye.png" mode="aspectFill"></image>
                            <text>{{bigNumberTransform(item.pariseNum)}}</text>
                        </view>
                        <view class="con-item-right" @click.stop="changeCollect('dataList_left',item,index)">
                            <image v-if="item.isCollect" src="../../../static/image/collection_a.png" mode="aspectFill"></image>
                            <image v-else src="../../../static/image/collection.png" mode="aspectFill"></image>
                            <text :class="item.isCollect?'is-collect':''">{{bigNumberTransform(item.collectNum)}}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="right-list">
                <view class="con-item" v-for="(item,index) in dataList_right" :key="index" @click="toUrl('/pages/exhibitor/exhibitor/detail?id='+item.id)">
                    <view class="image">
                        <image :src="item.src" mode="aspectFill"></image>									
                    </view>
                    <text class="con-title">{{item.title}}</text>
                    <view class="con-item-con">
                        <view class="con-item-left">
                            <image src="../../../static/image/eye.png" mode="aspectFill"></image>
                            <text>{{bigNumberTransform(item.pariseNum)}}</text>
                        </view>
                        <view class="con-item-right" @click.stop="changeCollect('dataList_right',item,index)">
                            <image v-if="item.isCollect" src="../../../static/image/collection_a.png" mode="aspectFill"></image>
                            <image v-else src="../../../static/image/collection.png" mode="aspectFill"></image>
                            <text :class="item.isCollect?'is-collect':''">{{bigNumberTransform(item.collectNum)}}</text>
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
                searchType:0,
				exhibitInfo:{
					name:'中国李宁',
					booth:'E.12',
					browseNum:3543,
					collectNum:7865,
					praiseNum:767
				},
				dataList:[
					{
						title:"中国李宁卫衣",
						src:require('@/static/image/head.png'),
						pariseNum:'56809',
						collectNum:'56',
						isCollect:true
					},{
						title:"中国李宁卫衣",
						src:require('@/static/image/lining.png'),
						pariseNum:'568',
						collectNum:'56',
						isCollect:true
					},{
						title:"中国李中国李宁卫衣中国李宁卫衣中国李宁卫衣中国李宁卫衣宁卫衣",
						src:require('@/static/image/head.png'),
						pariseNum:'5809',
						collectNum:'56',
					},{
						title:"中国李宁卫衣",
						src:require('@/static/image/shoes.png'),
						pariseNum:'6809',
						collectNum:'56',
					},{
						title:"中国李宁卫衣",
						src:require('@/static/image/shoes.png'),
						pariseNum:'5609',
						collectNum:'56',
						isCollect:true
					},{
						title:"中国李宁卫衣",
						src:require('@/static/image/head.png'),
						pariseNum:'5689',
						collectNum:'56',
					},{
						title:"中国李宁卫衣",
						src:require('@/static/image/head.png'),
						pariseNum:'5609',
						collectNum:'56',
					},{
						title:"中国李宁卫衣",
						src:require('@/static/image/head.png'),
						pariseNum:'56809',
						collectNum:'56',
						isCollect:true
					}
				],
				selectList:[
					{
						text:'关注',
						value:0
					},{
						text:'国潮',
						value:1
					},{
						text:'国货',
						value:2
					},{
						text:'新消费',
						value:3
					},{
						text:'潮流玩具',
						value:4
					},{
						text:'手办',
						value:5
					},{
						text:'盲盒',
						value:6
					}
				],
				selectActive:0,
                showSelectType:false,
                dataList_left:[],
                dataList_right:[],
				titlePaddingTop:'',
                listPaddingTop:''
			}
        },
        created(){
			this.dataList.forEach((item,index)=>{
                if(index%2==0){
                    this.dataList_left.push(item)
                }else{
                    this.dataList_right.push(item)
                }
            })
		},
        mounted(){
            const query = uni.createSelectorQuery().in(this);
            query.select('.header-con').boundingClientRect(data => {
                this.titlePaddingTop = data.height
            }).exec();
            query.select('.con-title').boundingClientRect(data => {
                this.listPaddingTop = data.height +this.titlePaddingTop
            }).exec();
        },
		onReachBottom() {
			
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
			changeCollect(listName,item,index){
				
				this[listName][index].isCollect = !item.isCollect
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
			

        },
        onShow(){
            
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
			position: fixed;
			z-index: 999;
			padding: 0 30rpx;
			background: linear-gradient(180deg, #EE7C5A 0%, #FFDC78 100%);
			padding-bottom: 60rpx;
		}
        .title{
            font-size: 37rpx;
            font-weight: 500;
            color: #FFFFFF;
			display: flex;
			align-items: center;
			.title-text{
                color: #FFFFFF;
            }
        }

        .detail-title{
            margin-top: 18rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            
            .title-name{
				display: flex;
				align-items: center;
                
				
				text{
					font-size: 44rpx;
					font-family: PingFangSC-Semibold, PingFang SC;
					font-weight: 600;
					color: #FFFFFF;
					max-width: 300rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				
				image{
					width: 16rpx;
					height: 30rpx;
					margin-left: 7rpx;
				}
            }
			
			.share-btn{
				width: 140rpx;
				height: 54rpx;
				background: #FFFFFF;
				border-radius: 28rpx;
				border: 1px solid #FFFFFF;
				display: flex;
				align-items: center;
				justify-content: center;
				
				image{
					width: 36rpx;
					height: 36rpx;
					margin-right: 8rpx;
				}
				
				text{
					font-size: 26rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #FF4141;
				}
			}
        }

        .nav{
            margin-top: 20rpx;
            display: flex;
			align-items: center;
            justify-content: space-around;

            .nav-item{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .num{
                   font-size: 40rpx;
                   font-family: PingFangSC-Medium, PingFang SC;
                   font-weight: 500;
                   color: #FFFFFF;
				   margin-bottom: 3rpx;
                }

                .name{
                   font-size: 24rpx;
                   font-family: PingFangSC-Medium, PingFang SC;
                   font-weight: 500;
                   color: #FFFFFF;
                }
            }
        }
		
		.con-title{
			width: 100%;
			z-index: 9999;
			position: fixed;
			top: 384rpx;
			left: 0;
			border-radius: 20rpx 20rpx 10rpx 10rpx;
			padding: 30rpx;
			background: #FFFFFF;
			.con-titles{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-bottom: 30rpx;
				border-bottom: 1px solid #DDDDDD;
				
				.num{
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #909090;
				}
				
				.select-btn{
					display: flex;
					align-items: center;
					
					image{
						width: 36rpx;
						height: 36rpx;
						margin-right: 10rpx;
					}
					
					text{
						font-size: 28rpx;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #FF4141;
					}
				}
			}
			
			.select-con{
				display: flex;
				align-items: center;
				justify-content: space-between;
				flex-wrap: wrap;
				margin-top: 30rpx;
				.select-item{
					width: calc((100% - 108rpx) / 3);
					height: 60rpx;
					padding: 0 12rpx;
					background: #F5F5F5;
					border-radius: 30rpx;
					margin-bottom: 24rpx;
					text-align: center;
					line-height: 60rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 28rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #222222;
				}
				
				.select-active{
					background: #FFEFEF;
					border: 1px solid #FF4141;
				}
			}
		}
    }
	
	.con-list{
		width: 100%;
		padding: 24rpx;
		background: #F5F5F5;
		// margin-top: 300rpx;
		display: flex;  
		// flex-flow:row wrap;
		// padding-top: 186rpx;

        .left-list{
            .con-item:nth-child(1){
                image{
                    height: 346rpx;
                }
            }
        }

        .left-list,.right-list{
            width: calc(100% / 2);
            display: flex;
            flex-direction: column;
		
            .con-item{
                margin: 10rpx;
                // width: calc(100% / 2 - 24rpx);
                background-color: #f5f5f5;
                border-radius: 14rpx;
                overflow: hidden;
                background: #FFFFFF;
                
                image{
                    width: 100%;
                    height: 406rpx;
                    margin-bottom: 30rpx;
                }
                
                .con-title{
                    font-size: 28rpx;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #333333;
                    padding: 0 20rpx;
                    width: 200rpx;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                
                .con-item-con{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20rpx;
                    
                    image{
                        margin: 0;
                        margin-right: 4rpx;
                    }
                    
                    .con-item-left{
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
                    
                    .con-item-right{
                        image{
                            width: 30rpx;
                            height: 30rpx;
                        }
                        
                        text{
                            font-size: 26rpx;
                            font-family: PingFangSC-Medium, PingFang SC;
                            font-weight: 500;
                            color: #222222;
                        }
                        
                        .is-collect{
                            color: #FF4141;
                        }
                    }
                }
            }
        }
	}

   

</style>
