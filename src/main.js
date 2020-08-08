import Vue from 'vue'
import PortalVue from 'portal-vue'
import VueToasted from 'vue-toasted'
import VueClipboard from 'vue-clipboard2'

import KeybindManager from './keybindManager'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPen, faEraser, faEyeDropper, faFill, faCog, faTimes, faLevelDownAlt, faPlus, faLayerGroup, faPlay, faStop, faStepBackward, faStepForward, faCopy, faFileExport, faFileImport, faTrash, faPaste } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faPen,
  faEraser,
  faEyeDropper,
  faFill,
  faCog,
  faTimes,
  faLevelDownAlt,
  faPlus,
  faLayerGroup,
  faPlay,
  faStop,
  faStepBackward,
  faStepForward,
  faCopy,
  faPaste,
  faFileExport,
  faFileImport,
  faTrash
)

Vue.component('fa-icon', FontAwesomeIcon)

import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.use(PortalVue)
Vue.use(VueClipboard)
Vue.use(VueToasted, {
  duration: 3000,
  keepOnHover: true
})
Vue.use(KeybindManager)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
