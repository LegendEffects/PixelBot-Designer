import Vue from 'vue';

module.exports = {
    components: {
        'modal': Vue.component('modal', require('./modal.vue')),
        'pixelGrid': Vue.component('pixelgrid', require('./pixelGrid.vue')),
        'palette': Vue.component('palette', require('./palette.vue')),
        'toolbox': Vue.component('toolbox', require('./toolbox.vue')),
    }
}