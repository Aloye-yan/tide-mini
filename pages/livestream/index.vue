<template>
	<view class="content">
        <view class="header" ref="header">
			<view class="header-box">
				<view class="header-con">
					<view class="title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
						<text class='title-text'>Music CHINA</text>
					</view>
					<view class="search">
					    <view class="search-content">
					        <image mode="aspectFit" src="@/static/image/search.png"></image>
					        <input type="text" placeholder="请输入关键字" v-model="keyword" @confirm="doSearch(keyword)"
					         placeholder-class="placeholder-class" confirm-type="search">
					    </view>
					</view>
					<view class="checkDate">
					    <view v-for="(item,index) in dateArr" :key="index" class="date" @click="selectDate = index">
					        <text>{{item}}</text>
					        <view v-if="selectDate==index" class="Underline"></view>
					    </view>
					</view>
				</view>
				
				<view class="nav">
				    <view v-for="(item,index) in optionArr" :key='index' @click="optionSelect = index"
				        :class="['option',index===optionSelect?'active':'']">{{item}}
				    </view>
				</view>
			</view>
			
        </view>
        <view class="main">
            
            <view class="Live-content">
                <view v-for="(item,index) in LiveContent" :key="index" class="liveBox">
                    <image mode="aspectFill" :src="item.path"/>
                    <view class="title">{{item.title}}</view>
                    <view class="time">
                        <image src="@/static/image/clock.png"/>
                        <text>{{formatDate(item.time)}}</text>
                    </view>
                    <view class="address">
                        <image src="@/static/image/coordinates.png"/>
                        <text>{{item.address}}</text>
                    </view>
                    <view class="status status1" v-if="item.status == 0">
                        <text>{{item.statusName}}</text>
                        <image src="@/static/image/right_arrow.png"/>
                    </view>
                    <view class="status status2" v-if="item.status == 1">
                        <text>{{item.statusName}}</text>
                    </view>
                    <view class="status status3" v-if="item.status == 2">
                        <text>{{item.statusName}}</text>
                        <image src="@/static/image/right_arrow2.png"/>
                    </view>
                </view>
            </view>
        </view>
        <view class="tab">
            <tabbar></tabbar>
        </view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
                customBarH: this.customBar,
                mainHeight:'',
                keyword:'',
                dateArr:['7月7日','7月8日','7月9日','7月10日','7月11日'],
                selectDate:0,
                optionArr:['开幕式','活动直播','现场直播'],
                optionSelect:0,
                LiveContent:[
                    {
                        path:require('@/static/image/head.png'),
                        title:'2021世界工人大会开幕式',
                        time:new Date().getTime(),
                        address:'世博中心 餐厅1-2',
                        statusName:'正在直播',
                        status:0
                    },
                    {
                        path:require('@/static/image/head.png'),
                        title:'2021世界工人大会开幕式',
                        time:new Date().getTime(),
                        address:'世博中心 餐厅1-2',
                        statusName:'倒计时 1天2h',
                        status:1
                    },
                    {
                        path:require('@/static/image/head.png'),
                        title:'2021世界工人大会开幕式',
                        time:new Date().getTime(),
                        address:'世博中心 餐厅1-2',
                        statusName:'回播',
                        status:2
                    },
                ]
			}
        },
        mounted(){
            const query = uni.createSelectorQuery().in(this);
            query.select('.header').boundingClientRect(data => {
                this.mainHeight = data.height
            }).exec();
            query.select('.tab').boundingClientRect(data => {
                console.log(data.height)
            }).exec();
        },
		methods: {
            formatDate(date) {
                if(!date){
                    return date
                }
                var date = new Date(date)
                var year = date.getFullYear(); 
                var month = date.getMonth() + 1; 
                var day = date.getDate(); 
                var hour = date.getHours(); 
                var minute = date.getMinutes(); 
                var second = date.getSeconds(); 
                return year + "-" + this.formatTen(month) + "-" + this.formatTen(day)+ " " +this.formatTen(hour)+ ":" +
                this.formatTen(minute)+ ":" +this.formatTen(second); 
            },

            formatTen(num) { 
                return num > 9 ? num : ("0" + num); 
            },
			//执行搜索
			doSearch(key) {
				if(key.replace(/\s+/g,'') && key.replace(/\s+/g,'')!=''){
					this.isSearch = false
					this.keyword = key;
			
			         uni.request({
			            url: 'https://suggest.taobao.com/sug', //仅为示例
			            method: 'GET',
			            data: {
			                code:'utf-8',
			                q: key
			            },
			            success: (res) => {
			                this.LiveContent = res.data.result;
			            }
			        });
				}				
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
		min-height: calc(100vh - 100rpx);
		padding-bottom: 100rpx;
		display: flex;
		flex-direction: column;
		background: #FFFFFF;
		position: relative;
	}
    .header{
		width: 100%;
		height: 410rpx;
		.header-box{
			width: 100%;
			position: fixed;
			z-index: 999;
		}
		.header-con{
			padding: 0 30rpx;
			background: linear-gradient(180deg, #EE7C5A 0%, #FFDC78 100%);
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

        .search{
            height: 72rpx;
			line-height: 72rpx;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 14rpx;
            margin-top: 18rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            
            .search-content{
                height: 40rpx;
                line-height: 40rpx;
                display: flex;
                justify-content: space-around;
                align-items: center;
                image{
                    width: 36rpx;
                    height: 36rpx;
                }
                input{
                    font-size: 30rpx;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 0.6);
                }
				.placeholder-class {
					color: rgba(255, 255, 255, 0.6) !important;
				}
            }
        }

        .checkDate{
            margin-top: 20rpx;
            display: flex;
            justify-content: space-around;

            .date{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;

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
		.nav{
			width: 100%;
		    padding: 30rpx;
		    display: flex;
			position: fixed;
			z-index: 999;
			background: #FFFFFF;
		    .active{
		        background: linear-gradient(180deg, #EE7C5A 0%, #FFDC78 100%);
		        color: #ffffff !important;
		    }
		
		    .option{
		        height: 50rpx;
		        line-height: 50rpx;
		        padding: 0 28rpx;
		        border-radius: 8rpx;
		        border: 1px solid #FFA37E;
		        filter: blur(0px);
		        margin-right: 20rpx;
		        font-size: 30rpx;
		        font-family: PingFangSC-Medium, PingFang SC;
		        font-weight: 500;
		        color: #666666;;
		    }
		}

    }

    .main{
        padding: 0 30rpx;
		position: relative;
		background: #FFFFFF;
       

        .Live-content{
            overflow-y: auto;
			padding-top: 55rpx;
            .liveBox{
                width:100%;
                box-shadow: 0px 4rpx 16rpx 1rpx rgba(0, 0, 0, 0.14);
                border-radius: 14rpx;
                margin-bottom: 30rpx;
                position: relative;
                display: flex;
                flex-direction: column;
				padding-bottom: 30rpx;
                image{
                    width:100%;
                    height: 354rpx;
					border-radius: 14rpx 14rpx 0 0;
                }

                .title{
                    height: 38rpx;
                    font-size: 32rpx;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 600;
                    color: #222222;
                    line-height: 38rpx;
                    margin:16rpx 0 2rpx 30rpx;
                }

                .time,.address{
                    height: 32rpx;
                    display: flex;
                    align-items: center;
                    margin: 12rpx 0 0 30rpx;
                    text{
                        height: 32rpx;
                        font-size: 26rpx;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        color: #666666;
                        line-height: 32rpx;
                        margin-left: 14rpx;
                    }
                    image{
                        width: 30rpx;
                        height: 30rpx;
                    }
                }

                

                .status{
                    position: absolute;
                    right: 30rpx;
                    top:370rpx;
                    height: 50rpx;
                    border-radius: 22rpx;
                    display: flex;
                    align-items: center;
                    filter: blur(0px);
                    image{
                        width: 30rpx;
                        height: 30rpx;
                    }
                    text{
                        font-size: 26rpx;
                        font-family: PingFangSC-Regular, PingFang SC;
                        font-weight: 400;
                        margin-right: 10rpx;
                    }
                }

                .status1{
                    padding:0 14rpx;
                    background: linear-gradient(180deg, #EE7C5A 0%, #FFDC78 100%);
                    text{
                        color: #fff;
                    }
                }
                .status2{
                    padding:0 10rpx;
                    border:1rpx solid #EE7D5A;
                    text{
                        color: #EE7D5A;
                    }
                }
                .status3{
                    padding:0 10rpx 0 30rpx;
                    border:1rpx solid #EE7D5A;
                    text{
                        color: #EE7D5A;
                    }
                }
            }
        }
        
    }
   

</style>
