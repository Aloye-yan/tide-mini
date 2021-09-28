import {
	token
} from '../../utils/token'

import EventBus from "../../libs/event-bus.js"

import AuthorizationService from "../../api/mudules/authorization.js"
import CollectedRecordService from "../../api/mudules/collected-record.js"
import LikedRecordService from "../../api/mudules/liked-record.js"
import VotedRecordService from "../../api/mudules/voted-record.js"

const user = {
	state: {
		token: token.get(),
		account: {},
		user: {},
		collected: [],
		liked: [],
		voted: [],
		loading: false
	},
	getters: {
		hasCollected: (state) => (type, id) => {

			let key = ""

			switch (type) {
				case "EXHIBITOR":
					key = "exhibitor"
					break;
				case "EXHIBIT":
					key = "exhibit"
					break;
				case "LIVESTREAM":
					key = "livestream"
					break;
				default:
					break
			}

			return state.collected.findIndex(c => c.type == type && c[key].id === id) != -1
		},
		getCollected: (state) => (type, id) => {

			let key = ""

			switch (type) {
				case "EXHIBITOR":
					key = "exhibitor"
					break;
				case "EXHIBIT":
					key = "exhibit"
					break;
				case "LIVESTREAM":
					key = "livestream"
					break;
				default:
					break
			}

			return state.collected.find(c => c.type == type && c[key].id === id)
		},
		hasLiked: (state) => (type, id) => {

			let key = ""

			switch (type) {
				case "EXHIBITOR":
					key = "exhibitor"
					break;
				case "EXHIBIT":
					key = "exhibit"
					break;
				case "LIVESTREAM":
					key = "livestream"
					break;
				default:
					break
			}

			return state.liked.findIndex(l => l.type == type && l[key].id === id) != -1
		},
		getLiked: (state) => (type, id) => {

			let key = ""

			switch (type) {
				case "EXHIBITOR":
					key = "exhibitor"
					break;
				case "EXHIBIT":
					key = "exhibit"
					break;
				case "LIVESTREAM":
					key = "livestream"
					break;
				default:
					break
			}

			return state.liked.find(l => l.type == type && l[key].id === id)
		},
		hasVoted: (state) => (awardId, id) => {

			return state.voted.findIndex(l => l.award.id == awardId && l.exhibit.id === id) != -1
		},
		getVoted: (state) => (awardId, id) => {

			return state.voted.find(l => l.award.id == awardId && l.exhibit.id === id)
		},

	},
	mutations: {
		SET_TOKEN: (state, t) => {
			state.token = t
			token.set(t)
		},
		SET_LOADING: (state, loading) => {
			state.loading = loading
		},
		SET_ACCOUNT: (state, account) => {
			state.account = account
		},
		SET_USER: (state, user) => {
			state.user = user
		},
		SET_COLLECTED: (state, collected) => {
			state.collected = collected
			EventBus.$emit("setCollected")
		},
		SET_LIKED: (state, liked) => {
			state.liked = liked
			EventBus.$emit("setLiked")
		},
		SET_VOTED: (state, voted) => {
			state.voted = voted
			EventBus.$emit("setVoted")
		},
	},

	actions: {
		// user login
		async Login({
			dispatch,
			commit
		}, user) {

			const result = await uni.login();

			if (result.length == 2 && result[1].errMsg == "login:ok") {

				const code = result[1].code

				const authorization = await AuthorizationService.addAuthorization({
					type: "WECHAT_APPLET",
					code: code
				})
				// 设置token
				commit('SET_TOKEN', authorization.token)
				// 设置account
				commit('SET_ACCOUNT', authorization.account)
				// 设置user
				commit('SET_USER', authorization.account.user)

				await dispatch('getCollecteds')
				await dispatch('getLikeds')
				await dispatch('getVoteds')

			} else {
				throw new Error(result)
			}
		},

		// 获取用户信息
		async GetInfo({
			commit
		}) {

			const result = await uni.getUserInfo({
				withCredentials: true,
				lang: "zh_CN"
			})

			if (result.length == 2 && result[1].errMsg == "getUserInfo:ok") {

				const encryptedData = result[1].encryptedData
				const iv = result[1].iv


				// const authorization = await AuthorizationService.addAuthorization({
				// 	type: "WECHAT_APPLET",
				// 	code: code
				// })

				// // 设置token
				// commit('SET_TOKEN', authorization.token)
				// // 设置account
				// commit('SET_ACCOUNT', authorization.account)
				// // 设置user
				// commit('SET_USER', authorization.account.user)
			}
			// return new Promise((resolve, reject) => {
			// 	// getInfo()
			// 	//   .then(({ data }) => {
			// 	//     commit('SET_user', data.user)
			// 	//     resolve(data)
			// 	//   })
			// 	//   .catch(error => {
			// 	//     reject(error)
			// 	//   })
			// })
		},

		// 前端 登出
		FedLogOut({
			commit
		}) {
			return new Promise(resolve => {
				commit('SET_TOKEN', '')
				token.clear()
				resolve()
			})
		},
		async getCollecteds({
			state,
			commit
		}) {
			const result = await CollectedRecordService.getEntities({
				"user.id": state.user.id
			})

			commit('SET_COLLECTED', result)
		},
		async addCollected({
			state,
			commit,
			dispatch
		}, payload) {

			const params = {
				type: payload.type,
				user: {
					id: state.user.id
				}
			}

			let key = ""

			switch (payload.type) {
				case "EXHIBITOR":
					key = "exhibitor"
					break;
				case "EXHIBIT":
					key = "exhibit"
					break;
				case "LIVESTREAM":
					key = "livestream"
					break;
				default:
					break
			}

			params[key] = {
				id: payload.id
			}

			await CollectedRecordService.addEntity(params)

			await dispatch('getCollecteds')
		},
		async deleteCollected({
			state,
			getters,
			dispatch
		}, payload) {

			const collected = getters.getCollected(payload.type, payload.id)

			await CollectedRecordService.deleteEntity({
				id: collected.id
			})

			await dispatch('getCollecteds')
		},
		async getLikeds({
			state,
			commit
		}) {
			const result = await LikedRecordService.getEntities({
				"user.id": state.user.id
			})

			commit('SET_LIKED', result)
		},
		async addLiked({
			state,
			dispatch
		}, payload) {

			const params = {
				type: payload.type,
				user: {
					id: state.user.id
				}
			}

			let key = ""

			switch (payload.type) {
				case "EXHIBITOR":
					key = "exhibitor"
					break;
				case "EXHIBIT":
					key = "exhibit"
					break;
				case "LIVESTREAM":
					key = "livestream"
					break;
				default:
					break
			}

			params[key] = {
				id: payload.id
			}

			await LikedRecordService.addEntity(params)

			await dispatch('getLikeds')
		},
		async deleteLiked({
			state,
			getters,
			dispatch
		}, payload) {

			const liked = getters.getLiked(payload.type, payload.id)

			await LikedRecordService.deleteEntity({
				id: liked.id
			})

			await dispatch('getLikeds')
		},
		async getVoteds({
			state,
			commit
		}) {
			const result = await VotedRecordService.getEntities({
				"user.id": state.user.id
			})

			commit('SET_VOTED', result)
		},
		async addVoted({
			state,
			dispatch
		}, payload) {

			const params = {
				award: {
					id: payload.awardId
				},
				user: {
					id: state.user.id
				},
				exhibit: {
					id: payload.id
				},
			}

			await VotedRecordService.addEntity(params)

			await dispatch('getVoteds')
		},
		async deleteVoted({
			state,
			getters,
			dispatch
		}, payload) {

			const voted = getters.getVoted(payload.awardId, payload.id)

			await VotedRecordService.deleteEntity({
				id: voted.id
			})

			await dispatch('getVoteds')
		},
	}
}

export default user
