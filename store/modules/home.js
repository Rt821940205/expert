const store = {
	state: {
		user: {},
		snNo: '',
		share: false,
		accessToken:''
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
		async setAccessToken(state,accessToken) {
			state.accessToken = accessToken
		}
	},
	actions: {
		setUser: ({ commit }, user) => {
			commit('setUser', user)
		},
		setSnNo: ({ commit }, snNo) => {
			commit('setSnNo', snNo)
		},
		setShare: ({ commit }, share) => {
			commit('setShare', share)
		},
		setAccessToken: ({ commit }, accessToken) => {
			commit('setAccessToken', accessToken)
		}
	}
}
export default store