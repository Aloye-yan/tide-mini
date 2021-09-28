<template>
	<view class="content">
        <view class="header" ref="header">
			<view class="header-con">
				<view class="title" :style="[{'height': customBarH + 'px', 'padding-top': statusBarH + 'px'}]">
					<text class='iconfont back-left title-text' @tap="goBack()"></text>留言板
				</view>
				<view class="detail-title" :style="[{'paddingTop': customBarH + statusBarH + 'px'}]">
					<image class="detail-img" :src="exhibitInfo.img" mode="aspectFill"></image>
					<view class="title-con">
						<text class="name">{{exhibitInfo.name}}</text>
						<text class="booth">展位号：{{exhibitInfo.booth}}</text>
						<text class="parise">浏览数：{{exhibitInfo.praiseNum}}</text>
					</view>
				</view>
			</view>
        </view>
		
		<view class="con-box">
			<view class="message-details" v-for="(item,index) in exhibitInfo.messageInfo" :key="index"> 
                <view class="details-header">
                    <view class="headPortrait">
                        <image :src="item.personPortrait"/>
                    </view>
                    <view class="name">{{item.personName}}</view>
                    <view class="time">{{formatDate(item.time)}}</view>
                    <view class="delete" @tap="handleDelete(index)">
                        <image src="@/static/image/delete.png"/>
                    </view>
                </view>
                <view class="received">{{item.receivedContent}}</view>
                <view class="reply" v-if="item.reply.length!==0">
                    <view class="triangle"></view>
                    <view class="head-name">
                        <image :src="exhibitInfo.img"/>
                        <text>{{exhibitInfo.name}}</text>
                    </view>
                    <view>
                        <view class="reply-message" v-for="(reply,index) in item.reply" :key="index">
                            <view class="message">{{reply.content}}</view>
                            <view class="time">{{formatDate(reply.time)}}</view>
                        </view>
                    </view>
                </view>
			</view>
		</view>
		<view class="btn-con" v-if="!showPopup">
			<view class="bottom-btn"  @tap="openMessage()">
			    <view>发布新留言</view>
			    <image src="@/static/image/icons_Plane.png"/>
			</view>
		</view>
		
		
		<uni-popup ref="message" type="bottom" @maskClick="cancel()">
		    <view  class="popup-bottom" :style="{marginBottom:marginBottom+'px'}">
				<view class="select-date">
                    <view class="popup-btn">
                        <view class="cancel" @click="cancel()">取消</view>
                        <view class="submit" @click="determine()">确定</view>
                    </view>
					<view class="message-con">
						<textarea class="textarea" v-model="messageText" placeholder="请输入" placeholder-class="placeholder-class"></textarea>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import '@/static/icon/icon.scss'
	export default {
		data() {
			return {
				statusBarH: this.statusBar,
                customBarH: this.customBar,
				exhibitInfo:{
                    name:'中国李宁',
                    img:require('@/static/image/lining.png'),
					booth:'E.12',
                    praiseNum:767,
                    messageInfo:[
                        {
                            personName:'回归曼联',
                            time:new Date(),
                            personPortrait:require('@/static/image/lining.png'),
                            receivedContent:'中国用户选择奖（Super AllLeader，卓智慧人工智能引领者奖）坚持“追求卓越，引领未来”的理念，评选和运营秉持“高端化，国际化，专业化，市场化，智能化”原则，从全球范围发掘在人工智能领域中具有高度认可和美誉。',
                            reply:[
                                {
                                    content:'谢谢您的关注。',
                                    time:new Date()
                                }
                            ]
                        },
                        {
                            personName:'探险家',
                            time:new Date(),
                            personPortrait:require('@/static/image/lining.png'),
                            receivedContent:'中国用户选择奖（Super AllLeader，卓智慧人工智能引领者奖）坚持“追求卓越，引领未来”的理念，评选和运营秉持“高端化，国际化，专业化，市场化，智能化”原则，从全球范围发掘在人工智能领域中具有高度认可和美誉。',
                            reply:[
                                {
                                    content:'谢谢您的关注。',
                                    time:new Date()
                                },
                                {
                                    content:'谢谢您的关注，您的意见我们已经收纳了，感 谢您提出宝贵的意见。',
                                    time:new Date()
                                }
                            ]
                        },
                    ]
                },
				showPopup:false,
                messageText:'',
                userName:'',
                avatarUrl:'',
                marginBottom:'0'
			}
        },
		watch: {
			messageText(txt) {
				if( txt.indexOf('\n') != -1 ){ //敲了回车键了
				   uni.hideKeyboard() //收起软键盘
				}
			}
		},
        mounted(){
            
        },
		onReachBottom() {
			
		},
		methods: {
            goBack(){
                uni.navigateBack()
            },
            determine(){
                 uni.hideKeyboard()
                 this.getUser()
            },
            getUser(){
                uni.getUserProfile({
                desc: "登录",
                success: (res) => {
                    this.userName = res.userInfo.nickName
                    this.avatarUrl = res.userInfo.avatarUrl

                    this.exhibitInfo.messageInfo.unshift({
                        personName:this.userName,
                        time:new Date(),
                        personPortrait:this.avatarUrl,
                        receivedContent:this.messageText,
                        reply:[]
                    })
                    this.cancel()
                    }
                })
            },
            handleDelete(index){
                this.exhibitInfo.messageInfo.splice(index,1)
            },
			toUrl(url) {
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
			},
			openMessage(){
                this.showPopup = true;
                this.$refs.message.open()
			},
			cancel(){
				this.$refs.message.close()
				this.showPopup = false
				this.messageText = ''
            },
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
            }
        },
        onLoad(){
            uni.onKeyboardHeightChange(res => {  
                this.marginBottom = res.height
            })
        },
        onUnload() {      
            uni.offKeyboardHeightChange()
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
		min-height: calc(100vh - 120rpx);;
		display: flex;
		flex-direction: column;
		background: #F5F5F5;
		position: relative;
		padding-bottom: 120rpx;
	}
    .header{
		width: 100%;
		position: relative;
		.header-con{
			width: 100%;
			padding: 0 30rpx;
			background: linear-gradient(180deg, #EE7C5A 0%, #FABE6F 100%);
			padding-bottom: 100rpx;
			position: relative;
		}
        .title{
			width: 100%;
			z-index: 999;
			position: fixed;
			top: 0;
			left: 0;
            font-size: 37rpx;
            font-weight: 500;
            color: #FFFFFF;
			display: flex;
			align-items: center;
            justify-content: center;
			.title-text{
                color: #FFFFFF;
                position: absolute;
                left: 30rpx;
            }
			background: linear-gradient(180deg, #EE7C5A 0%, #F18E5F 100%);
        }

        .detail-title{
            display: flex;
            align-items: center;
			
			.detail-img{
				width: 120rpx;
				height: 120rpx;
				border-radius: 14rpx;
				margin-right: 20rpx;
			}
            
            .title-con{
				display: flex;
                height: 120rpx;
				flex-direction: column;  
                justify-content: space-between;              
				
				text{
					font-size: 24rpx;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #FFFFFF;
					max-width: 300rpx;
				}
				
				.name{
					font-size: 40rpx;
					font-weight: 600;
					max-width: 300rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					margin-top: 0;
				}
            }
			
        }
	}

	.con-box{
		width: 100%;
		padding: 24rpx;
        padding-bottom: 70rpx;
		margin-top: -70rpx;
		z-index: 1;
		.message-details{
            width: 100%;
            padding: 0 24rpx 30rpx 24rpx;
            background: #FFFFFF;
            border-radius: 20rpx;
            margin-bottom: 20rpx;

            .details-header{
                height: 110rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .headPortrait{
                    image{
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 50%;
                    }
                }
                .name{
                    width: calc(100% - 377rpx);
                    overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
                    font-size: 34rpx;
                }
                .time{
                    font-size: 26rpx;
                }
                .delete{
                    image{
                        width: 30rpx;
                        height: 30rpx;
                        border-radius: 50%;
                    }
                }
            }

            .received{
                font-size: 28rpx;
                line-height: 40rpx;
            }

            .reply{
                padding: 30rpx 24rpx 0 24rpx;
                margin-top: 20rpx;
                background: #F5F5F5;
                position: relative;

                .triangle{
                    border-bottom: 15rpx solid #F5F5F5;
                    border-top: 15rpx solid transparent;
                    border-left: 15rpx solid transparent;
                    border-right: 15rpx solid transparent;
                    position: absolute;
                    left: 70rpx;
                    top: -30rpx;
                }

                .head-name{
                    height: 100rpx;
                    display: flex;
                    align-items: center;

                    image{
                        width: 60rpx;
                        height: 60rpx;
                        border-radius: 50%;
                    }
                    text{
                        margin-left: 10rpx;
                        font-size: 34rpx;
                    }
                }

                .reply-message{
                    padding:30rpx 0;
                    border-bottom: 1rpx solid #D8D8D8;

                    .time{
                        font-size: 24rpx;
                        margin-top: 10rpx;
                        text-align: right;
                    }

                    &:nth-last-child(1){
                        border-bottom: none;
                    }
                }
            }
        }
	}
	.btn-con{
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		background: #F5F5F5;
		width: 100%;
		height: 120rpx;
		padding: 24rpx;
	}
	.bottom-btn{
		width: 100%;
		height: 80rpx;
        background: #FF4141;
        border-radius: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center;
		
        view{
            color:#fff;
            font-size: 32rpx;
            margin-right: 10rpx;
        }
        image{
            width: 30rpx;
            height: 30rpx;
        }
	}
	
	.popup-bottom{
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0px 0px;
		border: 1px solid #979797;
		padding: 30rpx;
		
		.message-con{
            width: 100%;
            display: flex;
			.textarea{
				width: 100%;
				background: #F5F5F5;
				border-radius: 10rpx;
				border: 1px rsolid #E0E0E0;
				padding: 20rpx;
				font-size: 28rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #222222;
			}
			.textarea::placeholder{
				font-size: 28rpx;
				color: #909090;
			}
		}
		
		.popup-btn{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20rpx;
			
			.cancel{
                color: #BCBCBC;
				font-size: 32rpx;
				font-weight: 400;
			}
			
			.submit{
				color: #FF4141;
                font-size: 32rpx;
				font-weight: 400;
			}
			
		}
	}
   

</style>
