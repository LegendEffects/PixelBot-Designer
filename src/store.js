import Vue from 'vue'
import Vuex from 'vuex'
import logging from './logging';

Vue.use(Vuex)

const workspace = {
  namespaced: true,

  state: {
    loaded: false,

    tool: 'pen',
    colour: '#000',
    drawing: false,
    palette: {},

    scrollLocked: false,
    timeline: false,
    
    grids: null,
    blankFrame: null,

    frames: [],
    currentFrame: 0,
    animationDelay: 500,
  },

  mutations: {
    toggleTimeline(state, enabled) {
      if(enabled === null) state.timeline = !state.timeline;
      else state.timeline = enabled;
    },

    switchFrame(state, newFrame) {
      if(state.frames[newFrame] === null) {
        logging.log('Frames', `Frame ${newFrame} doesn't exist.`, 'error');
        return false;
      }
      state.currentFrame = newFrame;
    },

    addSwatch(state, swatchObject) {
      state.palette[swatchObject.id] = swatchObject.hex;
    }
  },

  getters: {
    getFrame: (state) => (frame) => {
      return state.frames[frame];
    },
    getCurrentFrame: (state) => {
      return state.frames[state.currentFrame];
    }
  }
};


function saveSettings(settings) {
  localStorage.setItem('settings', JSON.stringify(settings));
}
const settings = {
  namespaced: true,

  state: {
    pixelSize: 35,
    clipboard: null,

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

    setClipboard(state, clipboard) {
      state.clipboard = clipboard;
      saveSettings(state);
    },
    
    changePixelSize(state, newSize) {
      if(newSize) {
        state.pixelSize = newSize;
      }
      saveSettings(state);
    }
  }
}

export default new Vuex.Store({modules: {
  workspace,
  settings
}});
