import Vue from 'vue';
import App from './App.vue';

import {library} from '@fortawesome/fontawesome-svg-core'
import {faLevelDownAlt, faPen, faEraser, faEyeDropper, faFill, faCog, faLayerGroup, faTimesCircle, faFileExport, faFileImport, faLink, faCopy, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faLevelDownAlt, faPen, faEraser, faEyeDropper, faFill, faCog, faLayerGroup, faTimesCircle, faFileExport, faFileImport, faLink, faCopy, faPlus, faTrash);
Vue.component('font-awesome-icon', FontAwesomeIcon)

import router from './router'
import PortalVue from 'portal-vue'
import VueClipboard from 'vue-clipboard2'
import store from './store'

import logging from './logging'

Vue.use(PortalVue)
Vue.use(VueClipboard)

Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
    router,
	store,

    data: {
		keybinds: {},
		palette: {
			a: '#ff0000',
			b: '#008000',
			c: '#0000ff',
			d: '#ffffff',
			e: '#000000',
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
			x: '#858d86',
			y: '#4c504d',
		},
		pixelMap: [],
	},

    methods: {
		registerKeybind(key, callback) {
			if(this.keybinds[key.charCodeAt(0)] !== 'undefined') {
				logging.log('Keybinds', `Registered keybind '${key}'`, 'success')
			} else {
				logging.log('Keybinds', `Registered keybind '${key}' but overwrote its previous bind.`, 'success')
			}

			this.keybinds[key.charCodeAt(0)] = callback;
			this.keybinds[key.toUpperCase().charCodeAt(0)] = callback;
		},
		findKeybind(e) {
			if (document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT') return;
			if (this.keybinds[e.which] !== undefined) {
				this.keybinds[e.which]();
			}
		},

		loadSettings() {
			logging.log('Settings', 'Loading user settings...')
			if (typeof (Storage) === 'undefined') {
				logging.log('Settings', 'User storage is not supported.', 'error') 
				return;
			}

			logging.log('Settings', 'User storage is supported')

			if(!localStorage.settings) {
				logging.log('Settings', 'No default settings found, Creating...', 'warn')
				localStorage.settings = JSON.stringify(this.$store.state.settings);
			}
			this.$store.state.settings = JSON.parse(localStorage.getItem("settings"));

			logging.log('Settings', 'Loaded!')
		},
		createPixelMap() {
			let final = [];
            for(let i=0;i<12;i++) {
                let row = [];
                for(let r=1;r<13;r++) row.push((i*12)+r);
                if(i % 2 === 1) final[i] = row.reverse();
                else final[i] = row;
            }
            this.pixelMap = final.reverse();
		}
	},
	
    created() {
		if(process.env.NODE_ENV === 'development') {
			logging.log('Build', 'Running in development mode', 'warn');
		} else {
			logging.log('Build', 'Running in production mode', 'warn');
		}

		document.onkeyup = this.findKeybind;
		this.loadSettings();
		this.createPixelMap();
	}
}).$mount('#app');