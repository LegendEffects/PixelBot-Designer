<template>
  <base-window title="Export" @close="setVisibility({name: 'export', val: false})" v-show="isVisible">
    <template slot="context-left">
      <div class="items">
        <div class="item" :class="{active: tab == 'drawing'}" @mousedown.stop @click="tab = 'drawing'">Drawing</div>
        <div class="item" :class="{active: tab == 'animation'}" @mousedown.stop @click="tab = 'animation'">Animation</div>
      </div>
    </template>

    <template slot="body">
      
      <div v-if="tab === 'drawing'" class="pad">
        <button class="btn dusk" @click="exportDrawing">Export Drawing</button>
        <div v-if="drawing !== null">

          <div v-if="onlyShowColorMap">
            <div class="copy-module">
              <p class="copy-area">!pbdhz.{{ toGZip(colorDrawing) }}</p>
              <button class="btn dusk copy-button" v-clipboard:copy="'!pbdhz.' + toGZip(colorDrawing)" v-clipboard:success="onCopy">
                <fa-icon icon="copy" />
              </button>
            </div>
          </div>

          <div v-else>
            <div class="copy-module">
              <p class="copy-area">!pbdz.{{ toGZip(drawing.join('.')) }}</p>
              <button class="btn dusk copy-button" v-clipboard:copy="'!pbdz.' + toGZip(drawing.join('.'))" v-clipboard:success="onCopy">
                <fa-icon icon="copy" />
              </button>
            </div>

            <div v-for="(grid, index) of drawing" :key="index" class="copy-module">
              <p class="copy-area">!pb{{ index + 1}}d.{{ toGZip(grid) }}</p>
              <button class="btn dusk copy-button" v-clipboard:copy="'!pb' + (index + 1) + 'd.' + toGZip(grid)" v-clipboard:success="onCopy">
                <fa-icon icon="copy" />
              </button>
            </div>
          </div>

        </div>
      </div>
      <div v-else-if="tab === 'animation'" class="pad">
        <button class="btn dusk" @click="exportAnimation">Export Animation</button>
        <div v-if="animation !== null">

          <div class="copy-module">
            <p class="copy-area">!pbaz.{{ toGZip(getAnimationDelay + '.' + animation.join('.')) }}</p>
            <button class="btn dusk copy-button" v-clipboard:copy="'!pbaz.' + toGZip(getAnimationDelay + '.' + animation.join('.'))" v-clipboard:success="onCopy">
              <fa-icon icon="copy" />
            </button>
          </div>

        </div>
      </div>

    </template>
  </base-window>
</template>

<script>
import BaseWindow from '@/components/base/BaseWindow'
import { mapGetters, mapMutations } from 'vuex'

import pbot from '@/pbot-lib.js'

export default {
  components: {
    BaseWindow
  },

  data() {return {
    drawing: null,
    colorDrawing: null,
    animation: null,

    tab: 'drawing'
  }},

  computed: {
    ...mapGetters({
      getCurrentFrame: 'workspace/currentFrame',

      getFrame: 'workspace/getFrame',
      getAllFrames: 'workspace/allFrames',

      getRawPalette: 'workspace/rawPalette',
      getAnimationDelay: 'workspace/animationDelay',
      isWindowVisible: 'settings/isWindowVisible'
    }),

    isVisible() {
      return this.isWindowVisible('export');
    },

    onlyShowColorMap() {
      return Object.values(this.getRawPalette).length !== 0;
    }
  },
  
  methods: {
    ...mapMutations({
      'setVisibility': 'settings/setSimpleWindowVisibility'
    }),

    toGZip(str) {
      return pbot.toGZip(str);
    },

    exportDrawing() {
      this.drawing = pbot.exportSingularGrids(this.getFrame(this.getCurrentFrame), this.getRawPalette);
      this.colorDrawing = pbot.exportColorMapDrawing(this.getFrame(this.getCurrentFrame), this.getRawPalette);
    },
    exportAnimation() {
      if(Object.values(this.getRawPalette).length !== 0) {
        this.$toasted.error('Animations don\'t support custom colors.');
        return;
      }
      
      this.animation = pbot.exportAnimatedGrids(this.getAllFrames, this.getRawPalette);
    },

    onCopy() {
      this.$toasted.success('Copied to clipboard!');
    }
  }
}
</script>

<style scoped lang="scss">
.copy-module {
  display: flex;
  flex-direction: row;

  margin: .5rem 0;

  img {
    width: 32px;
    height: 100%;

  }
  .copy-area {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;

    padding: .5rem;
    width: 100%;


    overflow-x: auto;
    margin: 0;
  }

  .copy-button.oversized {
    background-color: red;
  }
}
</style>