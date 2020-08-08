import Vue from "vue"
import logging from "@/logging"

import defaultPalette from '@/defaultPalette'

const logMessage = logging.log;

const state = {
  tool: "pen",
  focusedWindow: "",
  
  colours: {
    foreground: "#ffffff",
    background: "#000000"
  },

  scrollLocked: false,

  palette: {},

  frames: {},
  currentFrame: 0,
  animationDelay: 500
}

const mutations = {
  // Workspace Manipulation
  setFrame(state, frame) {
    if(state.frames[frame] === null) {
      logMessage("Workspace", `Frame ${frame} doesn't exist.`, 'error');
      return false;
    }
    
    state.currentFrame = frame;
  },
  addFrame(state, { id, frame }) {
    Vue.set(state.frames, id, frame);
  },
  setAnimationDelay(state, delay) {
    state.animationDelay = delay;
  },

  setPixel(state, { frame, grid, row, col, colour}) {
    Vue.set(state.frames[frame][grid][row], col, colour);
  },
  setFrameDrawing(state, { frameNum, frame }) {
    Vue.set(state.frames, frameNum, frame);
  },
  setFocusedWindow(state, window) {
    state.focusedWindow = window;
  },
  
  // Colours
  addSwatch(state, { code, hex }) {
    Vue.set(state.palette, code, hex);
  },
  setForegroundColour(state, hex) {
    state.colours.foreground = hex;
  },
  setBackgroundColour(state, hex) {
    state.colours.background = hex;
  },

  setColour(state, { type, hex }) {
    state.colours[type.toLowerCase()] = hex;
  },
  
  // Tool Related
  switchTool(state, tool) {
    state.tool = tool;
  }
}

const getters = {
  gridDisplay: (state) => (grid) => {
    return state.frames[state.currentFrame][grid];
  },
  focusedWindow: (state) => {
    return state.focusedWindow;
  },

  // Animation
  allFrames: (state) => {
    return state.frames;
  },
  getFrame: (state) => (frame) => {
    return state.frames[frame];
  },
  currentFrame: (state) => {
    return state.currentFrame;
  },
  animationDelay: (state) => {
    return state.animationDelay
  },

  // Tools
  currentTool: (state) => {
    return state.tool;
  },

  // Colours
  foregroundColour: (state) => {
    return state.colours.foreground;
  },
  backgroundColour: (state) => {
    return state.colours.background;
  },
  getColour: (state) => (type) => {
    return state.colours[type.toLowerCase()];
  },

  rawPalette: (state) => {
    return state.palette;
  },
  currentPalette: (state) => {
    return Object.assign({}, defaultPalette, state.palette);
  }
}

const actions = {
  addFrame({ commit, getters, rootGetters }) {
    commit('addFrame', {
      id: Object.keys(getters.allFrames).length,
      frame: JSON.parse(JSON.stringify(rootGetters.getBlankFrame))
    });
  },

  async removeFrame({getters}, frame) {
    const frames = getters['allFrames'];

    // Frame doesn't exist
    if(frames[frame] === undefined) {
      return false;
    }

    delete frames[frame];

    for(let i = frame + 1; i <= Object.keys(frames).length; i++) {
      const cache = frames[i];
      delete frames[i];
      frames[i - 1] = cache;
    }

    
  },

  modifyPixel({ commit }, ctx) {
    commit("setPixel", ctx);
  },

  swapColours({ commit, getters }) {
    const cache = getters.foregroundColour;
    
    commit('setForegroundColour', getters.backgroundColour);
    commit('setBackgroundColour', cache);
  },

  async fillPixel({ dispatch, getters }, {grid, row, col, colour, targetColour, overrideCheck}) {
    const display = getters.gridDisplay(grid);
    
    const rows = Object.keys(display).length;
    const cols = Object.keys(display[0]).length;
    
    row = parseInt(row);
    col = parseInt(col);
    
    // Prevent index out of range for basic indexes
    if(row > rows || col > cols || row < 0 || col < 0) return;
    if(!overrideCheck && display[row][col] === colour) return;

    await dispatch("modifyPixel", {frame: getters.currentFrame, grid, row, col, colour});
    
    // Up
    if((row - 1 >= 0) && display[row - 1][col] === targetColour && display[row - 1][col] !== colour) {
      dispatch("modifyPixel", {frame: getters.currentFrame, grid, row: row - 1, col, colour});
      await dispatch("fillPixel", {grid, row: row - 1, col, colour, targetColour, overrideCheck: true});
    }

    // Down
    if((row + 1 < rows) && display[row + 1][col] === targetColour && display[row + 1][col] !== colour) {
      dispatch("modifyPixel", {frame: getters.currentFrame, grid, row: row + 1, col, colour});
      await dispatch("fillPixel", {grid, row: row + 1, col, colour, targetColour, overrideCheck: true});
    }

    // Left
    if((col - 1 >= 0) && display[row][col - 1] === targetColour && display[row][col - 1] !== colour) {
      dispatch("modifyPixel", {frame: getters.currentFrame, grid, row, col: col - 1, colour});
      await dispatch("fillPixel", {grid, row, col: col - 1, colour, targetColour, overrideCheck: true});
    }

    // Right
    if((col + 1 < cols) && display[row][col + 1] === targetColour && display[row][col + 1] !== colour) {
      dispatch("modifyPixel", {frame: getters.currentFrame, grid, row, col: col + 1, colour});
      await dispatch("fillPixel", {grid, row, col: col + 1, colour, targetColour, overrideCheck: true});
    }
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};