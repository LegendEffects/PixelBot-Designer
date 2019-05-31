import Vue from 'vue';

module.exports = {
    components: {
        'modal': Vue.component('modal', require('./modal.vue')),
        'pixelGrid': Vue.component('pixelgrid', require('./pixelGrid.vue')),
        'palette': Vue.component('palette', require('./palette.vue')),
        'toolbox': Vue.component('toolbox', require('./toolbox.vue')),
        
        'importpanel': Vue.component('importpanel', require('./panels/import.vue')),
        'exportpanel': Vue.component('exportpanel', require('./panels/export.vue')),
        'clearpanel': Vue.component('clearpanel', require('./panels/clear.vue')),
        'settingspanel': Vue.component('settingspanel', require('./panels/settings.vue')),
        'credits': Vue.component('credits', require('./panels/credits.vue')),

        'colourswitcher': Vue.component('colourswitcher', require('./toolbox/colourSwitcher.vue')),
    }
}