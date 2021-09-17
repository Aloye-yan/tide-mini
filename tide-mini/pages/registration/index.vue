<template>
	<view class="registration">
		<web-view
			:src="`https://xzt.eastfair.com/regist/21/202110MusicEz/index.html#/home?ExhID=2714&InviteType=Platform&InviteCode=${inviteCode}&SpOpenID=${realUnionID}`">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inviteCode: "musiclab",
				realUnionID: "",
			}
		},
		onLoad() {

		},
		onShow() {
		},
		methods: {

		}
	}
</script>

<style>
	.registration {}
</style>
