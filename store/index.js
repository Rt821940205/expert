import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const context = require.context('./modules', false, /\.js$/)
const moduleStores = {}

context.keys().forEach(key => {
    const fileName = key.slice(2, -3)
    const fileModule = context(key).default
    moduleStores[fileName] = {
        ...fileModule
    }
})
export default new Vuex.Store({
    modules: {
        ...moduleStores
    }
})