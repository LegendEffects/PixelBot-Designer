<template>
  <div @dragstart.prevent draggable="false">
    <slot v-if="unstyled" name="body" />

    <div class="window-frame" ref="window" @mouseleave="stopDragging" @mousemove="attemptDrag" @mousedown.left="setFocusedWindow(title)" @touchstart="setFocusedWindow(title)" @touchmove="attemptDrag" :style="windowStyle" :class="{dragging: dragging.active}" v-else>
      <div class="title-bar" @mousedown.left="startDragging" @mouseup.left="stopDragging" @touchstart="startDragging" @touchend="stopDragging">

        <div class="context-actions-left">
          <slot name="context-left">
            <div class="window-title">{{ title }}</div>
          </slot>
        </div>

        <div class="context-actions-right">
          <slot name="contextRight">
            <div v-show="showClose" class="close-button" @click="$emit('close')" @mousedown.stop>
              <fa-icon icon="times" />
            </div>
          </slot>
        </div>

      </div>

      <div class="window-body">
        <slot name="body" />
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

// Utility class to get the clientX and clientY from a touchEvent or mouseEvent
function getClientPosition(event) {
  let clientX = 0;
  let clientY = 0;

  if(event instanceof TouchEvent) {
    clientX = event.targetTouches[0].clientX;
    clientY = event.targetTouches[0].clientY;

    event.preventDefault();
  } else if(event instanceof MouseEvent) {
    clientX = event.clientX;
    clientY = event.clientY;
  }

  return {
    clientX,
    clientY
  }
}

export default {
  name: "BaseWindow",
  props: {
    title: {
      type: String,
      default: ""
    },
    showClose: {
      type: Boolean,
      default: true
    },
    unstyled: {
      type: Boolean,
      defalt: false
    },

    maxWidth: {
      type: Number,
      default: null
    },
    maxHeight: {
      type: Number,
      default: null
    },

    settingsReference: {
      type: String,
      default: null
    }
  },

  data() {return {
    dragging: {
      active: false,
      offsetX: 0,
      offsetY: 0
    },
    position: {
      x: 0,
      y: 0
    }
  }},

  computed: {
    windowStyle() {
      const final = {};

      if(this.maxWidth === null) {
        let vw =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        final.maxWidth = (vw * 0.75) + "px"; // Set max width to 75% of the Viewport width
      } else {
        final.maxWidth = this.maxWidth + "px";
      }

      if(this.maxHeight === null) {
        let vh =  Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        final.maxHeight = (vh * 0.75) + "px"; // Set max height to 75% of the Viewport Height 
      } else {
        final.maxHeight = this.maxHeight + "px";
      }

      final.left = this.position.x + "px";
      final.top = this.position.y + "px";

      if(this.focusedWindow === this.title) {
        final.zIndex = 11;
      } else {
        final.zIndex = 10;
      }

      return final;
    },
    ...mapGetters({
      focusedWindow: "workspace/focusedWindow",
      getItemPosition: "settings/getItemPosition"
    })
  },

  methods: {
    startDragging(event) {
      // Calculate the offset from the top left of window, to where the dragging begun.
      // This way the box doesn't always align from the top left.
      // Making the action feel more natural.
      const position = getClientPosition(event);

      this.dragging.offsetX = position.clientX - this.position.x;
      this.dragging.offsetY = position.clientY - this.position.y;

      this.dragging.active = true;
    },
    stopDragging() {
      
      if(this.dragging.active && this.settingsReference !== null) {
        this.setItemPosition({
          item: this.settingsReference,
          x: this.position.x,
          y: this.position.y
        });
      }

      this.dragging = {
        active: false,
        startX: 0,
        startY: 0
      };
    },
    attemptDrag(event) {
      const position = getClientPosition(event);

      // Ignore if not dragging
      if(!this.dragging.active) return; 

      // Set the new position with the offset removed
      this.position.x = (position.clientX - this.dragging.offsetX);
      this.position.y = (position.clientY - this.dragging.offsetY);

      // Clamp the top and left of the window
      if(this.position.x < 0) this.position.x = 0;
      if(this.position.y < 0) this.position.y = 0;

      this.checkBounds();
    },
    checkBounds() {
      // Clamp the right and bottom of the window
      let vw =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      let vh =  Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

      // Get the bounding box of the window so we know the width and height
      const boundingBox = this.$refs.window.getBoundingClientRect();

      if(vw !== 0 && this.position.x + boundingBox.width > vw) this.position.x = vw - boundingBox.width;
      if(vh !== 0 && this.position.y + boundingBox.height > vh) this.position.y = vh - boundingBox.height;      
    },

    ...mapMutations({
      setFocusedWindow: "workspace/setFocusedWindow",
      setItemPosition: "settings/setItemPosition"
    })
  },

  created() {
    window.addEventListener('resize', this.checkBounds);

    if(this.settingsReference !== null) {
      const attemptPosition = this.getItemPosition(this.settingsReference);
      if(attemptPosition !== null) {
        this.position = attemptPosition;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.window-frame {
  position: absolute;

  display: flex;
  flex-direction: column;

  z-index: 10;

  background: var(--secondary-bg-color);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);

  &.dragging {
    cursor: grabbing;
  }

  .window-body {
    background: var(--secondary-bg-color);
    color: #fff;

    .pad {
      padding: 1rem;
    }
  }
}

.window-frame .title-bar {
  color: #fff;
  background:rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: row;

  .context-actions-left, .context-actions-right {
    display: flex;
    flex-direction: row;
  }

  .context-actions-right {
    margin-left: auto;
  }

  .window-title {
    line-height: 200%;

    margin: 0 .5rem;

    user-select: none;
  }
}

.window-frame .title-bar .close-button {
  background-color: rgba(0, 0, 0, .25);
  padding: .5rem 1rem;

  &:hover {
    background-color: red;
    color: #fff;

    cursor: default;
  }
}

.window-frame .items {
  display: flex;
  flex-direction: row;
  margin-right: 2rem;

  .item {
    padding: 0 0.5rem;
    line-height: 200%;
    user-select: none;

    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
      cursor: default;
    }

    &.active {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>