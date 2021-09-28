<template>
	<view class="content">
		<view class="nav-head">
			<view class="nav-box">
				<view class="nav-title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<view class="title">
						<text class="iconfont back-left back" @tap="goBack()"></text>
						我的收藏
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
        <view v-if="tabType==0">
            <view class="con-list" v-for="(item,index) in business" :key="index"> 
                <view class="con-item" v-for="(goods,i) in item.goodsList" :key="i"  @click="toUrl('/pages/exhibitor/exhibitor/detail?id='+item.id)">
                    <view class="goods-left">
                        <image :src="goods.src" mode="aspectFill"></image>
                        <view class="goods-con">
                            <text class="title">{{goods.name}}</text>
                            <view class="goods-num">
                                <text> 展位：{{goods.booth}}</text>
                            </view>
                        </view>
                    </view>
                    <view class="goods-right">
                        <view>
                            <image class="collect" src="@/static/image/collection_a.png" mode="aspectFill"/>
                            <text class="collect-text">{{goods.collectNum}}</text>
                        </view>
                        <view>
                            <image class="View" src="@/static/image/eye.png" mode="aspectFill"/>
                            <text class="View-text">{{goods.Views}}</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>

        <view class="con-list-one" v-if="tabType==1">
            <view class="left-list">
                <view class="con-item" v-for="(item,index) in commodityList_left" :key="index"@click="toUrl('/pages/exhibitor/exhibit/detail?id='+item.id)">
                    <view class="image">
                        <image :src="item.src" mode="aspectFill"></image>									
                    </view>
                    <text class="con-title">{{item.title}}</text>
                    <view class="con-item-con">
                        <view class="con-item-left">
                            <image src="../../../static/image/eye.png" mode="aspectFill"></image>
                            <text>{{bigNumberTransform(item.pariseNum)}}</text>
                        </view>
                        <view class="con-item-right" @click.stop="cancelCollect('commodityList_left',item,index)">
                            <image v-if="item.isCollect" src="../../../static/image/collection_a.png" mode="aspectFill"></image>
                            <image v-else src="../../../static/image/collection.png" mode="aspectFill"></image>
                            <text :class="item.isCollect?'is-collect':''">{{bigNumberTransform(item.collectNum)}}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="right-list">
                <view class="con-item" v-for="(item,index) in commodityList_right" :key="index" @click="toUrl('/pages/exhibitor/exhibitor/detail?id='+item.id)">
                    <view class="image">
                        <image :src="item.src" mode="aspectFill"></image>									
                    </view>
                    <text class="con-title">{{item.title}}</text>
                    <view class="con-item-con">
                        <view class="con-item-left">
                            <image src="../../../static/image/eye.png" mode="aspectFill"></image>
                            <text>{{bigNumberTransform(item.pariseNum)}}</text>
                        </view>
                        <view class="con-item-right" @click.stop="cancelCollect('commodityList_right',item,index)">
                            <image v-if="item.isCollect" src="../../../static/image/collection_a.png" mode="aspectFill"></image>
                            <image v-else src="../../../static/image/collection.png" mode="aspectFill"></image>
                            <text :class="item.isCollect?'is-collect':''">{{bigNumberTransform(item.collectNum)}}</text>
                        </view>
                    </view>
                </view>
            </view>
			
		</view>

        <view class="con-list-two" v-if="tabType==2">
            <view class="con-item" v-for="(item,index) in liveBroadcastList" :key="index" @click="toUrl('/pages/exhibitor/exhibitor/detail?id='+item.id)">
                <view class="image">
                    <image :src="item.src" mode="aspectFill"></image>									
                </view>
                <text class="con-title">{{item.title}}</text>
                <view class="con-item-con">
                    <view class="con-item-left">{{item.time}}</view>
                    <view class="con-item-right" @click.stop="cancelCollect('liveBroadcastList',item,index)">
                        <image src="@/static/image/collection_a.png" mode="aspectFill"></image>
                        <text>已收藏</text>
                    </view>
                </view>
                <view class="address">
                    <image src="@/static/image/coordinates.png" mode="aspectFill"/>
                    <text>{{item.address}}</text>
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
				business: [
					{
						goodsList:[
							{
								name:'鸿星尔克',
								src:require('@/static/image/erke.png'),
                                booth:'E3.4',
                                Views:'23.3万',
                                collectNum:'23'
							},{
								name:'安踏',
								src:require('@/static/image/shoes.png'),
                                booth:'E3.4',
                                Views:'23.3万',
                                collectNum:'23'
							},{
								name:'回力',
								src:require('@/static/image/huili.png'),
                                booth:'E3.4',
                                Views:'23.3万',
                                collectNum:'23'
							},{
								name:'李宁',
								src:require('@/static/image/lining.png'),
                                booth:'E3.4',
                                Views:'23.3万',
                                collectNum:'23'
							}
						]
					},{
						goodsList:[
							{
								name:'鸿星尔克',
								src:require('@/static/image/erke.png'),
                                booth:'E3.4',
                                Views:'23.3万',
                                collectNum:'23'
							},{
								name:'安踏',
								src:require('@/static/image/shoes.png'),
                                booth:'E3.4',
                                Views:'23.3万',
                                collectNum:'23'
							},{
								name:'回力',
								src:require('@/static/image/huili.png'),
                                booth:'E3.4',
                                Views:'23.3万',
                                collectNum:'23'
							},{
								name:'李宁',
								src:require('@/static/image/lining.png'),
                                booth:'E3.4',
                                Views:'23.3万',
                                collectNum:'23'
							}
						]
					}
				],
				tabList:['展商','展品','直播'],
                tabType:0,
                commodityList:[
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
                        isCollect:true
					},{
						title:"中国李宁卫衣",
						src:require('@/static/image/shoes.png'),
						pariseNum:'6809',
                        collectNum:'56',
                        isCollect:true
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
                        isCollect:true
					},{
						title:"中国李宁卫衣",
						src:require('@/static/image/head.png'),
						pariseNum:'5609',
                        collectNum:'56',
                        isCollect:true
					},{
						title:"中国李宁卫衣",
						src:require('@/static/image/head.png'),
						pariseNum:'56809',
						collectNum:'56',
						isCollect:true
					}
                ],
                commodityList_left:[],
                commodityList_right:[],
                liveBroadcastList:[
					{
						title:"第一次创新会议",
						src:require('@/static/image/head.png'),
                        time:'2021/04/02',
                        address:'县城滨江路25号',
						isCollect:true
					},{
						title:"第一次创新会议",
						src:require('@/static/image/lining.png'),
                        time:'2021/04/02',
                        address:'县城滨江路25号',
						isCollect:true
					},{
						title:"中国李中国李宁卫衣中国李宁卫衣中国李宁卫衣中国李宁卫衣宁卫衣",
						src:require('@/static/image/head.png'),
                        time:'2021/04/02',
                        address:'县城滨江路25号',
                        isCollect:true
					},{
						title:"第一次创新会议",
						src:require('@/static/image/shoes.png'),
                        time:'2021/04/02',
                        address:'县城滨江路25号',
                        isCollect:true
					},{
						title:"第一次创新会议",
						src:require('@/static/image/shoes.png'),
                        time:'2021/04/02',
                        address:'县城滨江路25号',
						isCollect:true
					},{
						title:"第一次创新会议",
						src:require('@/static/image/head.png'),
                        time:'2021/04/02',
                        address:'县城滨江路25号',
                        isCollect:true
					},{
						title:"第一次创新会议",
                        src:require('@/static/image/head.png'),
                        time:'2021/04/02',
                        address:'县城滨江路25号',
                        isCollect:true   
					},{
						title:"第一次创新会议",
						src:require('@/static/image/head.png'),
                        time:'2021/04/02',
                        address:'县城滨江路25号',
						isCollect:true
					}
                ],
			}
        },
        created(){
            this.commodityList.forEach((item,index)=>{
                if(index%2==0){
                    this.commodityList_left.push(item)
                }else{
                    this.commodityList_right.push(item)
                }
            })
        },
		methods:{
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
            cancelCollect(listName,item,index){
				this[listName].splice(index,1)
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
		display: flex;
		flex-direction: column;
		background: #F5F5F5;
	}
	
	.nav-head{
		width: 100%;
		height: 310rpx;
		margin-bottom: -28rpx;
		background: #F9BC6E;
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
    
    .con-list{
		padding: 30rpx;
		margin: 0 24rpx;
		border-radius: 10px;
		background: #FFFFFF;
		margin-bottom: 20rpx;
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
        height: 88rpx;
		display: flex;
        flex-direction: column;
        justify-content: space-between;
	}
	
	.con-list .con-item .goods-left .title{
		max-width: 300rpx;
		font-weight: 500;
		color: #000000;
		font-size: 32rpx;
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
    .con-list .con-item .goods-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
        
        .collect-text{
            font-size: 26rpx;
            margin-left: 10rpx;
            color: #FF4141;
        }
        .View-text{
            font-size: 24rpx;
            margin-left: 10rpx;     
            color: #909090;
        }

        .collect{
            width: 30rpx;
            height: 30rpx;
        }

        .View{
            width: 32rpx;
            height: 22rpx;
        }
    }

    .con-list-one{
        padding: 24rpx 0;
		margin: 0 24rpx;
		border-radius: 10px;
        background: #F5F5F5;
        display: flex;

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
    
    .con-list-two{
		margin: 0 24rpx;
        display: flex;
        flex-wrap: wrap;

        .con-item{
            margin: 10rpx;
            width: calc(100% / 2 - 20rpx);
            border-radius: 14rpx;
            overflow: hidden;
            background: #FFFFFF;
            display: flex;
            flex-direction: column;
            
            image{
                width: 100%;
                height: 326rpx;
            }
            
            .con-title{
                font-size: 32rpx;
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
                    font-size: 28rpx;
                }
                
                .con-item-right{
                    display:flex;
                    align-items: center;
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

            .address{
                padding-left: 20rpx;
                padding-bottom: 20rpx;
                display: flex;
                align-items: center;
                image{
                    width: 36rpx;
                    height: 36rpx;
                }
                text{
                    font-size: 24rpx;
                    color: #909090;
                }
            }
        }
	}

</style>
