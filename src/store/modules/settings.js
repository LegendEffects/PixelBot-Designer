import Vue from 'vue'

const state = {
  pixelSize: 35,
  clipboard: null,
  visible: false,

  toolbox: {
    mount: 'float-horizontal',
    position: {
      x: 0,
      y: 0
    }
  },

  timeline: {
    mount: 'float-horizontal',
    visible: false,
    position: {
      x: 0,
      y: 0
    }
  },

  simpleWindows: {
    export: {
      visible: false
    },
    import: {
      visible: false
    }
  },
  
}

const mutations = {
  // Misc
  setClipboard(state, clipboard) {
    state.clipboard = clipboard;
  },
  setPixelSize(state, pixelSize) {
    state.pixelSize = pixelSize;
  },
  setVisible(state, visible) {
    state.visible = visible;
  },

  // Toolbox
  setToolboxPosition(state, { x, y }) {
    Vue.set(state.toolbox, 'position', {x, y});
  },
  setToolboxMount(state, mount) {
    Vue.set(state.toolbox, 'mount', mount);
  },

  // Timeline
  setTimelinePosition(state, { x, y }) {
    Vue.set(state.timeline, 'position', {x, y});
  },
  setTimelineMount(state, mount) {
    Vue.set(state.timeline, 'mount', mount);
  },
  setTimelineVisibility(state, visible) {
    Vue.set(state.timeline, 'visible', visible);
  },

  
  // Simple Windows
  setItemPosition(state, {item, x, y}) {
    state[item].position.x = x;
    state[item].position.y = y;
  },

  setSimpleWindowVisibility(state, {name, val}) {
    Vue.set(state.simpleWindows[name], 'visible', val);
  }
}

const getters = {
  // Misc
  getPixelSize: (state) => {
    return state.pixelSize;
  },
  getClipboard: (state) => {
    return state.clipboard;
  },
  isVisible: (state) => {
    return state.visible
  },
  
  // Toolbox
  getToolbox: (state) => {
    return state.toolbox;
  },
  
  // Timeline
  getTimeline: (state) => {
    return state.timeline;
  },
  isTimelineVisible: (state) => {
    return state.timeline.visible;
  },
  
  
  // Simple Windows
  getItemPosition: (state) => (item) => {
    return state[item].position;
  },

  isWindowVisible: (state) => (window) => {
    return state.simpleWindows[window].visible;
  }
}

const actions = {
  toggleTimelineVisibility({ commit, getters }) {
    commit('setTimelineVisibility', !getters.isTimelineVisible);
  },
  toggleSettingsVisibility({ commit, getters }) {
    commit('setVisible', !getters.isVisible);
  },

  toggleSimpleWindowVisibility({ commit, getters }, window) {
    commit('setSimpleWindowVisibility', {
      name: window,
      val: !getters.isWindowVisible(window)
    });
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
};