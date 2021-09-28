<template>
	<view class="content">
		<view class="nav-head">
			<view class="nav-title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
				<view class="title">
					<text class="iconfont back-left back" @tap="goBack()"></text>
					<text>消息列表</text>
				</view>
			</view>	
		</view>
        <view class="categoryAll">
            <view :class="['category', item.isShow?'':'category-hide']" v-for="(item,index) in list" :key="index">
                <view class="header">
                    <view>{{item.name}}</view>
                    <view class="right">
                        <text :class="['iconfont','select',item.isShow?'':'up']" @tap="handleIsshow(index)"></text>
                        <view class="num" v-show="!item.isShow">{{item.num}}</view>
                    </view> 
                </view>
                <view class="messageBox">
                    <view v-for="(data,id) in item.data" :key="id" class="messageData" @tap="toUrl(data.url)">
                        <image mode="aspectFill" :src="data.path"/>
                        <view class="center_data">
                            <text>{{data.name}}</text>
                            <view>留言&nbsp;&nbsp;({{data.number}})</view>
                        </view>
                        <view class="number">{{data.number}}</view>
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
                marginTop:'',
                list:[
                    {
                        name:'展商',
                        data:[
                            {
                                path:require('@/static/image/lining.png'),
                                name:'中国李宁',
                                number:3,
                                url:'MessageBoard/index'
                            },
                            {
                                path:require('@/static/image/huili.png'),
                                name:'回力',
                                number:2,
                                url:'MessageBoard/index'
                            },
                            {
                                path:require('@/static/image/erke.png'),
                                name:'鸿星尔克',
                                number:3,
                                url:'MessageBoard/index'
                            },
                        ],
                        isShow:true,
                        num:0
                    },
                    {
                        name:'展品',
                        data:[
                            {
                                path:require('@/static/image/lining.png'),
                                name:'中国李宁',
                                number:3,
                                url:'MessageBoard/index'
                            },
                            {
                                path:require('@/static/image/huili.png'),
                                name:'回力',
                                number:2,
                                url:'MessageBoard/index'
                            },
                            {
                                path:require('@/static/image/erke.png'),
                                name:'鸿星尔克',
                                number:3,
                                url:'MessageBoard/index'
                            },
                        ],
                        isShow:true,
                        num:0
                    },
                ]
			}
        },
        mounted(){
            // const query = uni.createSelectorQuery().in(this);
            // query.select('.nav-title').boundingClientRect(data => {
            //     this.marginTop = data.height
            // }).exec();
        },
		methods: {
			goBack(){
				uni.navigateBack()
			},
            handleIsshow(index){
                this.list[index].isShow = !this.list[index].isShow
                if(!this.list[index].isShow){
                    this.list[index].data.forEach(ele => {
                        this.list[index].num += ele.number
                    });
                }else{
                    this.list[index].num = 0
                }
            },
            toUrl(url){
                uni.navigateTo({
                    url:url
                },)
            }
		}
	}
</script>

<style lang="scss" scoped>
    view{
		box-sizing: border-box;
	}
	text{
		color: #222222;
	}

    .content {
		width: 750rpx;
		width: 100%;
		min-height:100vh;
		display: flex;
		flex-direction: column;
		background: #F5F5F5;
	}
    .nav-head{
		width: 100%;
		height: 220rpx;
		background: linear-gradient(180deg, #F5A667 0%, #F5A667 100%);
        .nav-title{
            width: 100%;
            padding-left: 12rpx;
            position: fixed;
            z-index: 9999;
            text-align: center;
			background: linear-gradient(180deg, #EE7C5A 0%, #F5A667 100%);

            .title{
				width: 100%;
				height: 100%;
                position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				text{
					font-size: 34rpx;
					font-weight: 600;
					color: #FFFFFF;
				}
                .back{
                    font-size: 32rpx;
					position: absolute;
					left: 20rpx;
                }
            }
        }
	}
	
	.categoryAll{
        padding: 0 30rpx;
        background:#f5f5f5;

        .category{
            height: 631rpx;
            background: #FFFFFF;
            border-radius: 10rpx;
            margin-bottom: 20rpx;
            padding: 0 24rpx;
            transition: all 0.2s linear;

            &:nth-child(1){
                margin-top: -47rpx;
            }

            .header{
                height: 120rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color:#222;
                font-weight: 600;
                font-size: 36rpx;

                .right{
                    width: 86rpx;
                    display: flex;
                    flex-direction: row-reverse;
                    justify-content: space-between;
                    align-items: center;

                    .num{
                        width: 34rpx;
                        height: 34rpx;
                        line-height: 34rpx;
                        text-align: center;
                        background: #FF4141;
                        border-radius: 50%;
                        color: #fff;
                        font-weight: 500;
                        font-size: 28rpx;
                    }

                    .select{
                        transition: transform .3s;
                    }

                    .up{
                        transform: rotateZ(180deg);
                    }
                }
            }

            .messageBox{
                height: 182rpx;
                margin-top:-20rpx;

                .messageData{
                    padding: 30rpx 0;
                    display: flex;
                    justify-content: space-between;
                    height: 180rpx;
                    border-bottom: 1px solid #DDD;

                    &:nth-last-child(1){
                        border-bottom: none;
                    }

                    image{
                        width: 160rpx;
                        height: 120rpx;
                        border-radius: 10rpx;
                    }

                    .center_data{
                        width: calc(100% - 194rpx);
                        padding-left: 18rpx;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        text{
                            color: #222;
                            font-weight: 600;
                            font-size: 32rpx;
                        }

                        view{
                            color: #909090;
                            font-size: 30rpx;
                        }
                    }

                    .number{
                        width: 34rpx;
                        height: 34rpx;
                        line-height: 34rpx;
                        text-align: center;
                        background: #FF4141;
                        border-radius: 50%;
                        color: #fff;
                        font-size: 28rpx;
                    }
                }

            }
        }

        .category-hide{
            height: 120rpx;
            overflow: hidden;
        }
    }
</style>
