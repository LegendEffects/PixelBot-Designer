<template>
  <div class="switcher">
    <div class="foreground colour" :style="{backgroundColor: foreground}" @click="pickerWindows.foreground = true" />
    <div class="background colour" :style="{backgroundColor: background}" @click="pickerWindows.background = true" />
    
    <div class="swap-colours" @click="swapColours">
      <fa-icon icon="level-down-alt" />
    </div>

    <portal to="float" id="colour_floats">
      <picker-popout selecting="Foreground" @close="pickerWindows.foreground = false" v-show="pickerWindows.foreground" @showAddColour="showAddColour" />
      <picker-popout selecting="Background" @close="pickerWindows.background = false" v-show="pickerWindows.background" @showAddColour="showAddColour" />

      <colour-addition @close="addColour = false" v-show="addColour" />
    </portal>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

import PickerPopout from './ColourPickerPopout'
import ColourAddition from './ColourAddition'

export default {
  components: {
    PickerPopout,
    ColourAddition
  },
  data() {return {
    pickerWindows: {
      foreground: false,
      background: false
    },
    addColour: false
  }},

  computed: {
    ...mapGetters({
      background: "workspace/backgroundColour",
      foreground: "workspace/foregroundColour",
      palette: "workspace/currentPalette",
      getSettings: 'settings/getToolbox'
    })
  },
  methods: {
    ...mapActions({
      swapColours: "workspace/swapColours"
    }),
    ...mapMutations({
      setForegroundColour: "workspace/setForegroundColour",
      setBackgroundColour: "workspace/setBackgroundColour",
      setFocusedWindow: "workspace/setFocusedWindow"
    }),

    showAddColour() {
      this.addColour = true;
      this.setFocusedWindow('Add Swatch');
    }
  },

  created() {
    if(!this.getSettings.ready) {
      this.$keybinds.$addProcessor((event) => {
        if(!event.altKey) return;
        if(!this.palette[event.key]) return;

        if(event.ctrlKey) {
          this.setBackgroundColour(this.palette[event.key]);
        } else {
          this.setForegroundColour(this.palette[event.key]);
        }

        event.preventDefault();
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.switcher {
  position: relative;
  display: flex;
  flex-direction: column;

  .foreground {
    position: relative;
    z-index: 5;

    margin-right: auto;
  }

  .background {
    position: relative;
    z-index: 4;

    margin-left: 35%;
    margin-top: -35%;
  }

  .colour {
    width: 65%;
    height: 65%;

    content: '';
  }

  .swap-colours {
    position: absolute;
    z-index: 6;

    cursor: pointer;
    color: #d6d6d6;

    font-size: 12px;

    right: 5%;
  }
}

</style>