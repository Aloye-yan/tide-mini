import Vue from 'vue'
import Vuex from 'vuex'
// import user from './modules/user.js'
import config from './modules/config.js'
import getters from './getters.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // user,
    config
  },
  getters
})

export default store
