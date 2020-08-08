<template>
  <base-window @close="$emit('close')" :title="selecting + ' Colour Selector'" style="cursor: default">
    <template slot="body">
      <div class="palette">
        
        <div 
          v-for="(hex, index) of palette" 
          :key="index" 

          @click="setColour(hex)"
          
          :style="{backgroundColor: hex}" 
          :class="{active: colour(selecting) === hex}"

          class="swatch"
        >
          <div class="char-container">
            <div class="char">{{ index }}</div>
          </div>
        </div>

        <div class="swatch addition" @click="$emit('showAddColour')">
          <fa-icon class="icon" icon="plus" /> 
        </div>

      </div>
    </template>
  </base-window>
</template>

<script>
import BaseWindow from '@/components/base/BaseWindow'

import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    BaseWindow
  },

  props: {
    selecting: {
      type: String,
      default: 'Foreground'
    }
  },

  computed: {
    getType() {
      return this.selecting;
    },

    ...mapGetters({
      colour: 'workspace/getColour',
      palette: 'workspace/currentPalette'
    })
  },

  methods: {
    setColour(hex) {
      this.setStateColour({
        type: this.selecting,
        hex
      });
    },

    ...mapMutations({
      setStateColour: 'workspace/setColour',
      addSwatch: 'workspace/addSwatch'
    })
  }
}
</script>

<style scoped lang="scss">
.palette {
  display: flex;

  flex-wrap: wrap;
  flex-direction: row;
  
  width: calc(2rem*10 + 4px);
  padding: 1rem;

  .swatch {
    cursor: pointer;
    
    width: 2rem;
    height: 2rem;

    margin: 2px;

    &.active {
      box-shadow: inset 0px 0px 0px 2px var(--accent-color);
    }

    &.addition {
      color: #fff;
      font-size: 1.5rem;
      text-align: center;
      line-height: 150%;
    }

    .char-container {
      background: rgba(0, 0, 0, 0.25);
      width: 100%;
      color: #fff;

      .char {
        margin-left: .25rem;
        user-select: none;
      }
    }
  }
}
</style>