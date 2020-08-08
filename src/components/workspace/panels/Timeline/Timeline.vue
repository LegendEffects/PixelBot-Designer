<template>
  <base-window ref="window" title="Timeline" :unstyled="mounted" v-show="visible" @close="setVisibility(false)" settingsReference="timeline">
    <template slot="body">
      <div class="timeline" :class="windowClass" id="panels_timeline">
        <div class="action-bar">
          <div class="actions">
            <div class="action" @click="addFrame">
              <fa-icon icon="plus" />
            </div>

            <div class="action nopad">
              <input v-model="modelAnimationDelay" type="number" class="form-control" :min="delta" style="width: 3rem;">
              <span class="no-select">&nbsp;ms</span>
            </div>
          </div>

          <div class="actions right">
            <div class="action" @click="deleteFrameClicked">
              <fa-icon icon="trash" />
            </div>

            <div class="action" @click="iterate(-animationDelay)">
              <fa-icon icon="step-backward" />
            </div>

            <div class="action" @click="togglePlaying">
              <fa-icon icon="play" v-if="!playing" />
              <fa-icon icon="stop" v-else />
            </div>

            <div class="action" @click="iterate(animationDelay)">
              <fa-icon icon="step-forward" />
            </div>
          </div>
        </div>

        <div class="scroll-container" ref="scrollContainer">
          <div class="width-container">
            <div class="time-ruler">
              <div class="indicator" ref="indicator" :style="indicatorStyle" />
              <div class="indicator-line" :style="indicatorStyle" />
            </div>

            <div class="previews">
              <preview-frame class="grid-array" v-for="(frame, index) of frames" :key="index" :frame="frame" :fid="parseInt(index)" :class="{'selected': isFrameSelected(index)}" @select="select(index)" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-window>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import BaseWindow from '@/components/base/BaseWindow'
import PreviewFrame from './PreviewFrame'

export default {
  components: {
    BaseWindow,
    PreviewFrame
  },
  props: {
    orientation: {
      type: String,
      default: "vertical"
    },
    mounted: {
      type: Boolean,
      default: true
    }
  },

  data() {return {
    delta: 5, // The delta used every interval, we can't use 1 because it loses track VERY EASILY (1000 ms in 1ms intervals took 2s)
    progress: 0, // How far in MS is the indicator along
    playing: false,

    itterator: null,
    selected: null
  }},

  computed: {
    ...mapGetters({
      visible: 'settings/isTimelineVisible',

      frames: 'workspace/allFrames',
      animationDelay: 'workspace/animationDelay',
      currentFrame: 'workspace/currentFrame'
    }),

    modelAnimationDelay: {
      get() {
        return this.animationDelay;
      },
      set(body) {
        this.setAnimationDelay(body);
      }
    },

    windowClass() {
      if(this.mounted) {
        return ["mounted", "mount-" + this.orientation];
      }

      return ["unmounted", "mount-" + this.orientation];
    },

    indicatorStyle() {
      const duration_ms = Object.keys(this.frames).length * this.animationDelay;
      const duration_percent = (this.progress / duration_ms) * 100;

      return {
        left: duration_percent+"%"
      };
    },

  },
  
  methods: {
    ...mapMutations({
      setFrame: 'workspace/setFrame',
      setAnimationDelay: 'workspace/setAnimationDelay',
      setVisibility: 'settings/setTimelineVisibility'
    }),
    ...mapActions({
      addFrame: 'workspace/addFrame',
      deleteFrame: 'workspace/removeFrame'
    }),

    select(frame) {
      frame = parseInt(frame);

      if(this.selected === frame) {
        this.selected = null;
      } else {
        this.selected = frame;
      }
    },
    isFrameSelected(frame) {
      return parseInt(frame) === this.selected;
    },

    deleteFrameClicked() {
      if(this.selected !== null) {
        this.deleteFrame(this.selected);
        this.selected = null;
      }
    },

    iterate(delta) {
      this.progress += delta;

      const frameCount = Object.keys(this.frames).length; // Get the amount of frames that are in the animation
      const duration = frameCount * this.animationDelay; // Calculate the length of the animation in ms

      if(this.progress < 0) this.progress = 0;
      if(this.progress > duration) this.progress = 0; // Loop back to the start

      // Calculate which frame we're on
      let frame = Math.floor(this.progress / this.animationDelay);

      // Check if the frame actually exists, (if the duration is for example 1000 / 1000 then it would give 2)
      if(frame > frameCount - 1) {
        frame -= 1;
      }

      // Move scroll bar if needed
      const scrollContainer = this.$refs.scrollContainer;
      const window = this.$refs.window.$el;

      if(scrollContainer.scrollWidth > window.clientWidth) {
        const indicator = this.$refs.indicator;

        // Check if the indicator is outside of the current viewport or is outside of the current scroll offset
        if(indicator.offsetLeft > scrollContainer.clientWidth + scrollContainer.scrollLeft || indicator.offsetLeft < scrollContainer.scrollLeft) {
          scrollContainer.scrollLeft = indicator.offsetLeft;
        }
      }

      // Set frame
      if(frameCount === 1 && this.currentFrame !== 0) {
        this.setFrame(0);
        return;
      }

      if(this.currentFrame !== frame) {
        this.setFrame(frame);
      }
    },

    start() {
      if(this.playing) return;

      // Set the interval to the itterator variable so that it can be cancelled later
      this.itterator = setInterval(() => {
        this.iterate(this.delta);
      }, this.delta);
      this.playing = true;
    },

    stop() {
      clearInterval(this.itterator);
      this.playing = false;
    },

    togglePlaying() {
      if(this.playing) {
        this.stop();
      } else {
        this.start();
      }
    }
  }
}
</script>

<style scoped lang="scss">
.timeline {
  background-color: var(--secondary-bg-color);
}

.time-ruler {
  padding: .2rem 0;
  height: 7px;
  width: 100%;
  background-color: rgba(0, 0, 0, .25);

  margin-bottom: .2rem;

  .indicator {
    position: absolute;

    width: 7px;
    height: 7px;

    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
    
    background-color: var(--accent-color);
  }

  .indicator-line {
    position: absolute;

    width: 1px;
    margin-left: 3px;

    top: 6px;
    bottom: 0;

    background-color: var(--accent-color);
  }
}

.previews {
  display: flex;
  flex-direction: row;

  .grid-array:not(:last-child) {
    margin-right: .25rem;
  }

  .grid-array.selected {
    border: solid var(--accent-color) 1px;
  }
}

.scroll-container {
  overflow-x: auto;
  padding-bottom: 1rem;
}
.width-container {
  position: relative;
  width: fit-content;
}

.action-bar {
  color: #fff;
  display: flex;

  .actions {
    padding: .2rem .2rem;

    display: flex;
    flex-direction: row;
    
    &.right {
      margin-left: auto;
    }

    .action {
      padding: .25rem .5rem;

      &:hover {
        background: rgba(0, 0, 0, .25);
        border-radius: 2px;
      }
      &.nopad {
        padding: 0;
      }
    }
  }
}
</style>