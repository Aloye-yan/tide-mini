var tabList = [{
  "pagePath": "pages/index/index"
},
{
  "pagePath": "pages/livestream/index"
},
{
  "pagePath": "pages/registrayion/index"
},
{
  "pagePath": "pages/user/index"
}]

const config = {
  state: {
    activebar: 0,
    
  },

  mutations: {
    SET_ACTIVEBAR: (state, data) => {
      state.activebar = data
    }
  },

  actions: {
    WatchTabbar({ commit, state }) {
		var pages = getCurrentPages()
		var path = (pages[pages.length - 1]).route
		for (const i in tabList) {
			if (tabList[i].pagePath === path) {
			  commit('SET_ACTIVEBAR', i*1)
			  break
			}
		}
    }
  }
}

export default config
