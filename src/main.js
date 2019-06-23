import Vue from 'vue';
import App from './App.vue';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLevelDownAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faLevelDownAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  data: {
    keybinds: {},
    palette: {
      a: '#ff0000',
      b: '#008000',
      c: '#0000ff',
      d: '#fff',
      e: '#000',
      f: '#ffff00',
      g: '#800000',
      h: '#800080',
      i: '#6441a5',
      j: '#000080',
      k: '#006400',
      l: '#ffd700',
      m: '#f0e68c',
      n: '#daa520',
      o: '#00ffff',
      p: '#008080',
      q: '#00ced1',
      r: '#ffa500',
      s: '#ff8c00',
      t: '#ff4500',
      u: '#ffc0cb',
      v: '#ff1393',
      w: '#ffa07a',
      x:'#858d86',
      y: '#4c504d',
    }
  },
  methods: {
    registerKeybind(key, callback) {
      this.keybinds[key.charCodeAt(0)] = callback;
      this.keybinds[key.toUpperCase().charCodeAt(0)] = callback;
    },
    findKeybind(e) {
      if(this.keybinds[e.which] !== undefined) {
        this.keybinds[e.which]();
      }
    }
  },
  created() {
    document.onkeyup = this.findKeybind;
  }
}).$mount('#app');