<template>
	<view class="content">
		<view class="nav-head">
			<view class="nav-title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
				<view class="title">
					<text class="iconfont back-left back" @tap="goBack()"></text>
					搜索
				</view>
			</view>	
		</view>
		
		<view class="search">
			<view class="search-box">
				<view class="input-box">
					<view class="search-type" @tap="openSearchType()">
						<text>{{searchType==1?'品牌':'企业'}}</text>
						<text class="iconfont select"></text>
					</view>
					<input type="text" @input="inputChange" v-model="keyword" @confirm="doSearch(keyword)"
					 placeholder-class="placeholder-class" confirm-type="search">
				</view>
				<view class="search-btn" v-if="isSearch" @tap="doSearch(keyword)">搜索</view>
				<view class="search-btn" v-else @tap="backSearch()"> 返回</view>
			</view>
			<view class="search-keyword" v-if="isSearch && !isShowKeywordList">
				<scroll-view class="keyword-box" scroll-y>
					<view class="keyword-block">
						<view class="keyword-list-header">
							<view>历史搜索</view>
							<view class="keyword-right" @tap="oldDelete">
								<image src="@/static/image/delete.png" mode="aspectFill"></image>
								清空
							</view>
						</view>
						<view class="keyword">
							<view v-for="key in oldKeywordList" @tap="doSearch(key)" :key="key">{{key}}</view>
						</view>
					</view>
					<view class="keyword-block">
						<view class="keyword-list-header">
							<view>热门搜索</view>
						</view>
						<view class="keyword">
							<view v-for="key in hotKeywordList" @tap="doSearch(key)" :key="key">{{key}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
			
			<view class="con-list" v-else>
				<view v-if="searchType == 0 && companyList">
					<view class="con-item" v-for="(item,i) in companyList" :key="i">
						<view class="goods-left">
							<image :src="item.src" mode="aspectFill"></image>
							<view class="goods-con">
								<text class="title">{{item.name}}</text>
								<view class="goods-num">
									<text> 展品：{{item.num}}件</text>
									<text> 展位：{{item.booth}}</text>
								</view>
							</view>
						</view>
						<view class="to-detail-btn" @click="toUrl('/pages/exhibitor/exhibitor/detaillist?id='+item.id)">进入主页</view>
					</view>
				</view>
				<view v-if="searchType == 1 && brandList">
					<view class="con-item" v-for="(item,i) in brandList" :key="i">
						<view class="goods-left">
							<image :src="item.src" mode="aspectFill"></image>
							<view class="goods-con">
								<text class="title">{{item.name}}</text>
								<view class="goods-num">
									<text> 展品：{{item.num}}件</text>
									<text> 展位：{{item.booth}}</text>
								</view>
							</view>
						</view>
						<view class="to-detail-btn" @click="toUrl('/pages/exhibitor/exhibit/detail?id='+item.id)">进入主页</view>
					</view>
				</view>
				<view class="no-search" v-if="brandList.length==0 && companyList.length==0">
					<view class="img">
						<view class="bubble"></view>
						<image src="../../static/image/no-search.png" mode="aspectFill"></image>
					</view>
					<text>暂无搜索结果</text>
				</view>
			</view>
		</view>
		<uni-popup ref="search" type="bottom">
            <view  class="popup_bottom">
				<view class='selectBox' @tap="[searchType = 0,cancel()]">企业</view>
				<view class='selectBox' @tap="[searchType = 1,cancel()]">品牌</view>
				<view style="height: 20rpx;background: #F5F5F5;"></view>
				<view class='selectBox' style="color:#646464" @tap="cancel">取消</view>
			</view>
        </uni-popup>
	</view>
</template>

<script>
	import '@/static/icon/icon.scss'
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				statusBarH: this.statusBar,
				customBarH: this.customBar,
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,
				searchType:0,
				searchTypeList:[
					{
						text:'企业',
						value:0
					},{
						text:'品牌',
						value:1
					}
				],
				isSearch:true,
				companyList:[
					{
						name:'鸿星尔克',
						src:require('@/static/image/erke.png'),
						booth:'E3.4',
						num:'11'
					},{
						name:'回力',
						src:require('@/static/image/huili.png'),
						booth:'E3.4',
						num:'11'
					},{
						name:'李宁',
						src:require('@/static/image/lining.png'),
						booth:'E3.4',
						num:'11'
					},{
						name:'安踏',
						src:require('@/static/image/shoes.png'),
						booth:'E3.4',
						num:'11'
					}
				],
				brandList:[
					{
						name:'鸿星尔克',
						src:require('@/static/image/erke.png'),
						booth:'E3.4',
						num:'11'
					},{
						name:'安踏',
						src:require('@/static/image/shoes.png'),
						booth:'E3.4',
						num:'11'
					},{
						name:'回力',
						src:require('@/static/image/huili.png'),
						booth:'E3.4',
						num:'11'
					},{
						name:'李宁',
						src:require('@/static/image/lining.png'),
						booth:'E3.4',
						num:'11'
					}
				]
			}
		},
		onLoad() {
			this.init();
		},
		methods: {
			init() {
				this.keyword = '';
				this.isSearch = true
				this.loadOldKeyword();
				this.loadHotKeyword();
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
			goBack(){
				uni.navigateBack()
			},
			backSearch(){
				this.init()
			},
			openSearchType(){
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.search.open()
            },
            cancel(){
                this.$refs.search.close()
            },
			//加载历史搜索
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//可以自己实现ajax请求数据再赋值
				this.hotKeywordList = ['键盘', '鼠标', '显示器', '电脑主机', '蓝牙音箱', '笔记本电脑', '鼠标垫', 'USB', 'USB3.0'];
			},
			//监听输入
			inputChange(event) {
                var keyword = event.detail.value;
				if (!keyword) {
                    this.isShowKeywordList = false;
                    this.isSearch = true
					return;
				}
				this.isShowKeywordList = true;
				
			},
			//高亮关键字
			drawCorrelativeKeyword: function(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row[0].replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row[0],
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setkeyword(data) {
				this.keyword = data.keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : 'no-';
			},
			//执行搜索
			doSearch(key) {
				this.companyList = []
				this.brandList = []
				if(key.replace(/\s+/g,'') && key.replace(/\s+/g,'')!=''){
					this.isSearch = false
					// key = key ? key : this.keyword ? this.keyword : '';
					this.keyword = key;
                    this.saveKeyword(key); //保存为历史 

                     uni.request({
                        url: 'https://suggest.taobao.com/sug', //仅为示例
                        method: 'GET',
                        data: {
                            code:'utf-8',
                            q: key
                        },
                        success: (res) => {
                            this.keywordList = this.drawCorrelativeKeyword(res.data.result, key);
                            let data = []
                            res.data.result.forEach(ele => {
                                data.push(
                                    {
                                        name:ele[0],
                                        src:require('@/static/image/lining.png'),
                                        booth:'E3.4',
                                        num:'11'
                                    }
                                )
                            });
                            if(this.searchType == 0){
                                this.companyList = []
                                this.companyList = data
                            }else{
                                this.brandList = []
                                this.brandList = data
                            }
                        }
                    });
				}				
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				if (keyword && keyword !== ''){
					uni.getStorage({
						key: 'OldKeys',
						success: (res) => {
							console.log(res.data);
							var OldKeys = JSON.parse(res.data);
							var findIndex = OldKeys.indexOf(keyword);
							if (findIndex == -1) {
								OldKeys.unshift(keyword);
							} else {
								OldKeys.splice(findIndex, 1);
								OldKeys.unshift(keyword);
							}
							//最多10个纪录
							OldKeys.length > 10 && OldKeys.pop();
							uni.setStorage({
								key: 'OldKeys',
								data: JSON.stringify(OldKeys)
							});
							this.oldKeywordList = OldKeys; //更新历史搜索
						},
						fail: (e) => {
							var OldKeys = [keyword];
							uni.setStorage({
								key: 'OldKeys',
								data: JSON.stringify(OldKeys)
							});
							this.oldKeywordList = OldKeys; //更新历史搜索
						}
					});
				}
				
			}
		}
	}
</script>

<style>
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
	}
	
	.nav-head{
		height: 160rpx;
	}
	
	.nav-title{
		width: 100%;
		padding-left: 12rpx;
		position: fixed;
		z-index: 9999;
		text-align: center;
		background: #FFFFFF;
	}
	
	.nav-title .title{
		height: 50px;
		line-height: 50px;
		position: relative;
	}
	
	.nav-title .title .back{
		font-size: 32rpx;
		position: absolute;
		left: 20rpx;
	}
	
	.search{
		padding: 30rpx;
	}
	
	.search-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 64rpx;
	}

	.search-box .input-box {
		height: 100%;
		display: flex;
		align-items: center;
		background: #F2F2F2;
		border-radius: 100px;
		padding: 0 28rpx;
		flex: 1;
		margin-right: 30rpx;
	}
	
	.search-box .input-box .search-type{
		width: 106rpx;
		display: flex;
		align-items: center;
		border-right: 1px solid #666666;
		margin-right: 16rpx;
	}
	
	.search-box .input-box .search-type text{
		font-weight: 400;
		color: #646464;
		font-size: 26rpx;
		margin-right: 6rpx;
	}
	
	.search-box .input-box .search-type text:last-child{
		font-size: 20rpx;
	}

	.search-box .search-btn {
		width: 56rpx;
		height: 40rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #FF4141;
	}

	.search-box .input-box>input {
		font-size: 26rpx;
		border: 0;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		font-weight: 400;
		color: #220000;
		flex: 1;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		
	}

	.keyword-box {
		height: calc(100vh - 100rpx);
	}

	.keyword-box .keyword-block {
		padding: 5px 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		font-size: 24rpx;
		font-weight: 400;
		color: #333333;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 26rpx 0;
	}
	
	.keyword-box .keyword-block .keyword-list-header .keyword-right{
		display: flex;
		align-items: center;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 30rpx;
		height: 30rpx;
	}

	.keyword-box .keyword-block .keyword {
		display: flex;
		align-items: center;
		flex-flow: wrap;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 26rpx 0;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 20rpx;
		margin: 25rpx 12rpx;
		height: 60rpx;
		background: #F5F5F5;
		border-radius: 40rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #333333;
	}
	
	.con-list{
		
	}
	
	.con-list .con-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #DDDDDD;
		padding: 30rpx 0;
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
	
	.con-list .con-item .to-detail-btn{
		width: 120rpx;
		height: 42rpx;
		line-height: 42rpx;
		text-align: center;
		background: #FF4141;
		border-radius: 21rpx;
		font-weight: 400;
		color: #FFFFFF;
		font-size: 22rpx;
	}
	
	.con-list .no-search{
		width:100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 87rpx;
	}
	
	.con-list .no-search .img{
		width: 296rpx;
		height: 296rpx;
		margin-bottom: 54rpx;
		text-align: center;
		line-height: 296rpx;
		border-radius: 50%;
		position: relative;
		overflow: hidden;
		background: linear-gradient(136deg, #FFE6D0 0%, #ffffff 100%);
	}
	
	.con-list .no-search .img .bubble{
		position: absolute;
		top: 0;
		right: 0;
		width: 97rpx;
		height: 97rpx;
		background: linear-gradient(136deg, #FF7600 0%, #FFC796 100%);
		opacity: 0.1;
		border-radius: 50%;
	}
	
	.con-list .no-search .img image{
		width: 290rpx;
		height: 290rpx;
	}
	
	.con-list .no-search text{
		font-size: 30rpx;
		font-weight: 400;
		color: #666666;
	}
    
    .popup_bottom{
        height: 316rpx;
        background: #FFFFFF;
        border-radius: 10rpx 10rpx 0px 0px;
    }

    .popup_bottom .selectBox{
        height: 98rpx;
        line-height: 98rpx;
        text-align: center;
        color: #222222;
        border-bottom: 1rpx solid #F5F5F5;
    } 
	
</style>
