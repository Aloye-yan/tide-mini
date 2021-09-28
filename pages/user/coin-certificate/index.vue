<template>
	<view class="content">
		<view class="nav-head">
			<view class="nav-box">
				<view class="nav-title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<view class="title">
						<text class="iconfont back-left back" @tap="goBack()"></text>
						我的预售兑换
					</view>
				</view>	
				<view class="nav">
				    <view v-for="(item,index) in tabList" :key="index" class="nav-item" @click="handleSwitch(index)">
				        <text>{{item}}</text>
				        <view v-if="tabType==index" class="Underline"></view>
				    </view>
				</view>
			</view>
		</view>
        <view class="con-list" v-for="(item,index) in dataFilterList" :key="index" @click="toUrl('/pages/user/coin-certificate/detail?status='+item.status)"> 
            <image :src="item.src" mode="aspectFill"/>
            <view class="con-item">
                <view>{{item.name}}</view>
                <text>核销码&nbsp;&nbsp;&nbsp;{{item.code}}</text>
            </view>
            <view class="status">
                <view class="btn" v-if="item.status===1">现场兑换</view>
                <view class="btn already" v-if="item.status===2">已兑换</view>
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
                        name:'中国李宁吉祥物',
                        src:require('@/static/image/lining.png'),
                        code:'156161ETFA56EFA',
                        status:1,
                    },
                    {
                        name:'中国李宁吉祥物',
                        src:require('@/static/image/lining.png'),
                        code:'156161ETFA56EFA',
                        status:1,
                    },
                    {
                        name:'yanlove咖啡',
                        src:require('@/static/image/lining.png'),
                        code:'156161ETFA56EFA',
                        status:2,
                    },
				],
				tabList:['全部','已使用','未使用'],
                tabType:0,
                dataFilterList:[]
			}
        },
        created(){
            this.dataFilterList = this.dataList
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
            handleSwitch(index){
                this.tabType = index
                switch(index){
                    case 0:
                        this.dataFilterList = this.dataList
                        break;
                    case 1:
                        this.dataFilterList = this.dataList.filter(item=>{
                            return item.status == 2
                        })
                        break;
                    case 2:
                        this.dataFilterList = this.dataList.filter(item=>{
                            return item.status == 1
                        })
                        break;
                }
                
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
		// background: linear-gradient(180deg, #EE7C5A 0%, #F5A266 100%);
		
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
        display: flex;
        justify-content: space-between;
        align-items: center;

        image{
            width: 100rpx;
            height: 100rpx;
            margin-right: 20rpx;
        }
        
        .con-item{
            flex: 1;
            height: 100rpx;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            view{
                font-size: 32rpx;
            }
            text{
                font-size: 26rpx;
                color: #FF4141;
            }
        }
        .status{
            .btn{
                width: 160rpx;
                height: 45rpx;
                line-height: 45rpx;
                text-align: center;
                border-radius: 25rpx;
                font-size: 26rpx;
                background: #FF4141;
                color: #fff;
            }
            .already{
                background: #d0d0d0;
                color: #fff;
            }
        }
	}
	
	

</style>
