import Vue from 'vue'
import Vuex from 'vuex'

import workspace from "./modules/workspace"
import settings from "./modules/settings"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ready: false,
    blankFrame: {}
  },
  
  modules: {
    workspace,
    settings
  }
})
