import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import FontAwesome from '@fortawesome/fontawesome-free';

Vue.use(require('vue-shortkey'));

VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

require('./components');
const App = require('./app.vue');

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');