import Vue from 'vue'
import Vuex from 'vuex'

import workspace from "./modules/workspace"
import settings from "./modules/settings"

import SettingsLocalStoragePlugin from "./plugins/settingsLocalStorage"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ready: false,
    blankFrame: {}
  },

  getters: {
    getBlankFrame: (state) => {
      return state.blankFrame;
    }
  },
  
  modules: {
    workspace,
    settings
  },

  plugins: [
    SettingsLocalStoragePlugin({
      moduleName: 'settings',
      localStorageName: 'settings'
    })
  ]
})
