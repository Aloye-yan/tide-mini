<template>
	<view class="content">
        <view class="header" ref="header">
			<view class="header-con">
				<view class="title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<text class='iconfont back-left title-text' @click="goBack()"></text>
					<text class='title-text'>展会新闻</text>
				</view>
			</view>
        </view>
		
		<view class="con-list" :style="[{'padding-top': customBarH + 'px'}]">
			<view class="news-item" v-for="(item,index) in newsList" :key="index">
				<view class="news-left">
					<text class="title">{{item.title}}</text>
					<text class="time">{{item.time}}</text>
				</view>
				<image class="news-right" :src="item.src"></image>
				
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
				newsList:[
					{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					},{
						title:'给你5年，你能做什么？钟薛高的前世今生',
						time:'2021-06-18',
						src:require('@/static/image/head.png')
					}
				],
			}
        },
        mounted(){
            
        },
		onReachBottom() {
			uni.$emit('onReachBottom');
		},
		methods: {
            goBack(){
            	uni.navigateBack()
            },

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
		position: fixed;
		z-index: 999;
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
			justify-content: center;
			position: relative;
			.title-text{
                color: #FFFFFF;
            }
			.back-left{
				position: absolute;
				left: 0;
			}
        }
    }
	
	.con-list{
		width: 100%;
		padding: 24rpx;
		background: #F5F5F5;
		.news-item{
			border-top: 1px solid #A6A6A6;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx;
		}
		.news-item:first-child{
			border: none;
		}
		.news-left{
			margin-right: 40rpx;
			display: flex;
			flex-direction: column;
			flex: 1;
			.news-left{
				margin-right: 40rpx;
				display: flex;
				flex-direction: column;
				flex: 1;
				.time{
					font-weight: 400;
					color: #888888;
					font-size: 28rpx;
				}
			}
		}
		.news-right{
			width: 180rpx;
			height: 140rpx;
		}
	}

   

</style>
