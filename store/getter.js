export default {
    researchDirectionCount: (state) => {
        return !!state.home.user.researchDirection ?
            state.home.user.researchDirection : []
    },
    eUserName: (state) => {
        return !!state.home.user.eUserName ?
            state.home.user.eUserName : []
    },
    researchDirectionCounts: (state) => {
        return !!state.home.user.researchDirection ?
            state.home.user.researchDirection.length :
            0;
    },
    eUserNames: (state) => {
        return !!state.home.user.eUserName ?
            state.home.user.eUserName.length :
            0;
    },

}