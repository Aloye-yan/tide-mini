<template>
	<view class="content">
        <view class="header" ref="header">
			<view class="header-con">
				<view class="title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<text class='iconfont back-left title-text' @tap="goBack()"></text>
				</view>
				<view class="search">
				    <view class="search-content">
				        <image mode="aspectFit" src="@/static/image/search.png"></image>
				        <input type="text" placeholder="请输入关键字" v-model="keyword" @confirm="doSearch(keyword)"
				         placeholder-class="placeholder-class" confirm-type="search">
				    </view>
				</view>
				<view class="nav">
				    <view v-for="(item,index) in searchTypeList" :key="index" class="nav-item" @click="searchType = index">
				        <text>{{item}}</text>
				        <view v-if="searchType==index" class="Underline"></view>
				    </view>
				</view>
			</view>
        </view>
		
		<view class="con-list">
			<exhibit v-if="searchType==0" :keyword="keyword" @doSearch="doSearch()"></exhibit>
			<exhibitor  v-if="searchType==1" :keyword="keyword" @doSearch="doSearch()"></exhibitor>
		</view>
	</view>
</template>

<script>
	import '@/static/icon/icon.scss'
	import exhibit from './exhibit/index.vue'
	import exhibitor from './exhibitor/index.vue'
	export default {
		components:{
			exhibit,
			exhibitor
		},
		data() {
			return {
				statusBarH: this.statusBar,
                customBarH: this.customBar,
                keyword:'',
                searchTypeList:['搜品牌','搜企业'],
                searchType:0,
				
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
			                this.all = res.data.result;
			            }
			        });
				}				
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
		height: 320rpx;
		.header-con{
			width: 100%;
			position: fixed;
			z-index: 999;
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

        .nav{
            margin-top: 20rpx;
            display: flex;
            justify-content: center;

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
    }
	
	.con-list{
		width: 100%;
		padding: 24rpx;
		background: #F5F5F5;
	}

   

</style>
