<template>
	<view class="content">
		<view class="nav-head">
			<view class="nav-box">
				<view class="nav-title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<view class="title">
						<text class="iconfont back-left back" @tap="goBack()"></text>
						商贸配对
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
            <view class="con-item">
                <view>{{item.name}}</view>
                <text>{{item.time}}</text>
            </view>
            <view class="status">
                <text v-if="item.status===2">预约成功</text>
                <view v-if="item.status===1" class="btn">
                    <view class="cancel-btn">取消</view>
                    <view class="confirm-btn">确认</view>
                </view>
                <view  v-if="item.status===0" class="cancel">已取消</view>
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
                dataList:[
                    {
                        name:'中国李宁',
                        time:'上午10:00 - 12:00',
                        status:2,
                    },
                    {
                        name:'中国安踏',
                        time:'上午10:00 - 12:00',
                        status:1,
                    },
                    {
                        name:'鸿星尔克',
                        time:'上午10:00 - 12:00',
                        status:0,
                    },
				],
				tabList:['7月7日','7月8日','7月9日'],
                tabType:0,
			}
        },
        created(){
        },
		methods:{
			goBack(){
				uni.navigateBack()
            },
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
        padding: 0 150rpx;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .con-item{
            height: 100rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            view{
                font-size: 34rpx;
                font-weight: 600;
            }
            text{
                font-size: 28rpx;
            }
        }
        .status{
            text{
                font-size: 30rpx;
                color: #EE7C5A;
            }
            .btn{
                display: flex;
                .confirm-btn{
                    width: 120rpx;
                    height: 45rpx;
                    line-height: 45rpx;
                    text-align: center;
                    border-radius: 25rpx;
                    background: #FF4141;
                    color: #fff;
                    font-size: 26rpx;
                    margin-left: 20rpx;
                }
                .cancel-btn{
                    width: 120rpx;
                    height: 45rpx;
                    line-height: 45rpx;
                    text-align: center;
                    border-radius: 25rpx;
                    border:1px solid #d0d0d0;
                    color: #d0d0d0;
                    font-size: 26rpx;
                }
            }
            .cancel{
                width: 120rpx;
                height: 45rpx;
                line-height: 45rpx;
                text-align: center;
                border-radius: 25rpx;
                background: #d0d0d0;
                color: #fff;
                font-size: 26rpx;
            }
        }
	}
	
	

</style>
