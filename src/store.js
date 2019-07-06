import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const workspace = {
  namespaced: true,

  state: {
    tool: 'pen',
    colour: '#000',
    drawing: false,

    scrollLocked: false,
    timeline: false,
  },
  mutations: {
    toggleTimeline(state, enabled) {
      if(enabled === null) state.timeline = !state.timeline;
      else state.timeline = enabled;
    }
  },
};


function saveSettings(settings) {
  localStorage.setItem('settings', JSON.stringify(settings));
}
const settings = {
  namespaced: true,

  state: {
    pixelSize: 35,

    layout: {
      toolbox: 'left',
      timeline: 'bottom',
    }
  },
  mutations: {
    moveToolbox(state, pos) {
      state.layout.toolbox = pos;
      saveSettings(state);
    },
    moveTimeline(state, pos) {
      state.layout.timeline = pos;
      saveSettings(state);
    },
    changePixelSize(state, newSize) {
      if(newSize) {
        state.pixelSize = newSize;
      }
      saveSettings(state);
    }
  },
  getters: {
    all: state => state,
  }
}

export default new Vuex.Store({modules: {
  workspace,
  settings
}});
