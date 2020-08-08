import Vue from "vue";
import logging from "../../logging";

const logMessage = logging.log;

const state = {
  tool: "pen",
  
  colours: {
    foreground: "#fff",
    background: "#000"
  },

  scrollLocked: false,

  palette: {},

  frames: {},
  currentFrame: 0,
  animationDelay: 500
}

const getters = {
  gridDisplay: (state) => (grid) => {
    return state.frames[state.currentFrame][grid];
  },
  currentTool: (state) => {
    return state.tool;
  }
}

const actions = {
  modifyPixel({ commit }, payload) {
    // Vue.set(state.frames[frame][grid][row], col, colour);
    commit("setPixel", payload)
  }
}

const mutations = {
  setFrame(state, frame) {
    if(state.frames[frame] === null) {
      logMessage("Workspace", `Frame ${frame} doesn't exist.`, 'error');
      return false;
    }

    state.currentFrame = frame;
  },

  setPixel(state, { frame, grid, row, col, colour}) {
    // state.frames[frame][grid][row][col] = colour;
    Vue.set(state.frames[frame][grid][row], col, colour);
  },

  addSwatch(state, { code, hex }) {
    state.palette[code] = hex;
  },

  switchTool(state, tool) {
    state.tool = tool;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};