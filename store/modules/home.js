const store = {
	state: {
		user: {},
		snNo: '',
		share: false,
		accessToken: '',
		userId: uni.getStorageSync("userId") || '',
		userNo: uni.getStorageSync("userNo") || '',
	},
	mutations: {
		async setUser(state, user) {
			state.user = user
		},
		async setSnNo(state, snNo) {
			state.snNo = snNo
		},
		async setShare(state, share) {
			state.share = share
		},
		async setAccessToken(state, accessToken) {
			state.accessToken = accessToken
		},
		async setUserId(state, userId) {
			state.userId = userId
		},
	},
	actions: {
		setUser: ({
			commit
		}, user) => {
			commit('setUser', user)
		},
		setSnNo: ({
			commit
		}, snNo) => {
			commit('setSnNo', snNo)
		},
		setShare: ({
			commit
		}, share) => {
			commit('setShare', share)
		},
		setAccessToken: ({
			commit
		}, accessToken) => {
			commit('setAccessToken', accessToken)
		},
		setUserId: ({
			commit
		}, userId) => {
			commit('setUserId', userId)
		},
	}
}
export default store