<template>
  <base-window title="Settings" v-show="getVisible" @close="setVisible(false)">
    <template slot="context-left">
      <div class="items">
        <div class="item" :class="{active: tab === 'toolbox'}" @mousedown.stop @click="tab = 'toolbox'">Toolbox</div>
        <div class="item" :class="{active: tab === 'timeline'}" @mousedown.stop @click="tab = 'timeline'">Timeline</div>
        <div class="item" :class="{active: tab === 'credits'}" @mousedown.stop @click="tab = 'credits'">Credits</div>
      </div>
    </template>
    <template slot="body">
      <div v-if="tab === 'toolbox'" class="pad">
        
        <div class="mount-selector">
          <img src="@/assets/img/mounts/float.png" title="Float (Horizontal)" @click="setToolboxMount('float-horizontal')" :class="{active: getToolboxMount == 'float-horizontal'}">
          <img src="@/assets/img/mounts/floatVertical.png" title="Float (Vertical)" @click="setToolboxMount('float-vertical')" :class="{active: getToolboxMount == 'float-vertical'}">
          <img src="@/assets/img/mounts/dock.png" title="Top" @click="setToolboxMount('top')" :class="{active: getToolboxMount == 'top'}">
          <img src="@/assets/img/mounts/dock.png" title="Right" @click="setToolboxMount('right')" class="r-90" :class="{active: getToolboxMount == 'right'}">
          <img src="@/assets/img/mounts/dock.png" title="Bottom" @click="setToolboxMount('bottom')" class="r-180" :class="{active: getToolboxMount == 'bottom'}">
          <img src="@/assets/img/mounts/dock.png" title="Left" @click="setToolboxMount('left')" class="r-270" :class="{active: getToolboxMount == 'left'}">
        </div>

      </div>
      <div v-else-if="tab === 'timeline'" class="pad">

        <div class="input-group">
          <span>Visible:</span>
          <label class="switch">
            <input type="checkbox" v-model="timelineVisibility">
            <span class="slider round"></span>
          </label>
        </div>

        <div class="mount-selector">
          <img src="@/assets/img/mounts/float.png" title="Float (Horizontal)" @click="setTimelineMount('float-horizontal')" :class="{active: getTimelineMount == 'float-horizontal'}">
          <img src="@/assets/img/mounts/floatVertical.png" title="Float (Vertical)" @click="setTimelineMount('float-vertical')" :class="{active: getTimelineMount == 'float-vertical'}">
          <img src="@/assets/img/mounts/dock.png" title="Top" @click="setTimelineMount('top')" :class="{active: getTimelineMount == 'top'}">
          <img src="@/assets/img/mounts/dock.png" title="Right" @click="setTimelineMount('right')" class="r-90" :class="{active: getTimelineMount == 'right'}">
          <img src="@/assets/img/mounts/dock.png" title="Bottom" @click="setTimelineMount('bottom')" class="r-180" :class="{active: getTimelineMount == 'bottom'}">
          <img src="@/assets/img/mounts/dock.png" title="Left" @click="setTimelineMount('left')" class="r-270" :class="{active: getTimelineMount == 'left'}">
        </div>
      </div>

      <div v-else-if="tab === 'credits'" class="pad credits">
        <div>Original PixelBot concept invented by <a href="https://laboratory424.com">Laboratory424</a><br></div>

        <div>Editor developed by <a href="https://legendeffects.co.uk">LegendEffects</a><br></div>
        <div>Original Editor by <a href="https://clawstudios.com">Claw Studios</a><br></div>
        <div>First editor concept by <a href="https://www.twitch.tv/CaptainPDA">CaptainPDA</a><br></div>
      </div>
    </template>
  </base-window>
</template>

<script>
import BaseWindow from '@/components/base/BaseWindow'
import { mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    BaseWindow
  },
  data() {return {
    tab: 'toolbox'
  }},

  computed: {
    ...mapGetters({
      'getToolbox': 'settings/getToolbox',
      'getTimeline': 'settings/getTimeline',
      'getVisible': 'settings/isVisible'
    }),

    getToolboxMount() {
      return this.getToolbox.mount;
    },
    getTimelineMount() {
      return this.getTimeline.mount;
    },

    timelineVisibility: {
      set(body) {
        this.setTimelineVisibility(body);
      },
      get() {
        return this.getTimeline.visible;
      }
    },
  },

  methods: {
    ...mapMutations({
      setToolboxMount: 'settings/setToolboxMount',
      setTimelineMount: 'settings/setTimelineMount',
      setTimelineVisibility: 'settings/setTimelineVisibility',

      setVisible: 'settings/setVisible'
    })
  }
}
</script>

<style scoped lang="scss">
.mount-selector {
  img {
    width: 48px;
    margin-right: .2rem;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.6);

    &.active {
      background-color: var(--accent-color);
    }
  }
}

.credits a {
  color: #fff;
}
</style>