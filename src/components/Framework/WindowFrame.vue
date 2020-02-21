<template>
  <div class="window-frame" :style="getStyle" :class="{dragging: dragging.active}" v-show="shown" @mousemove="attemptDrag">
    <div class="context-bar" @mousedown.left="startDragging" @mouseup.left="stopDragging">
      <div class="items">
        <div class="item" :class="{'active': item === activeItem}" v-for="(item, index) of items" :key="index" @mousedown.stop @click.stop="$emit('contextClick', item)">
          {{ item }}
        </div>
      </div>
      
      <div class="actions">
        <div v-show="showClose" class="close-button" @click="$emit('close')" @mousedown.stop>
          <font-awesome-icon icon="times" />
        </div>
      </div>
    </div>

    <div class="window-body">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    },
    activeItem: {
      type: String,
      default: ""
    },
    showClose: {
      type: Boolean,
      default: true
    },

    maxWidth: {
      type: Number,
      default: null
    },
    maxHeight: {
      type: Number,
      default: null
    }
  },

  data() {return {
    shown: false,

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
    getStyle() {
      let final = {};

      if(this.maxWidth === null) {
        let vw =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        final.maxWidth = (vw * 0.75) + "px" // Set max width to 75% of the Viewport width
      } else {
        final.maxWidth = this.maxWidth + "px";
      }

      if(this.maxHeight === null) {
        let vh =  Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        final.maxHeight = (vh * 0.75) + "px"; // Set max height to 75% of the Viewport Height 
      } else {
        final.maxHeight = this.maxHeight + "px";
      }

      final.top = this.position.y + "px";
      final.left = this.position.x + "px";

      return final;
    }
  },

  methods: {
    startDragging(event) {
      // Calculate the offset from the top left of window, to where the dragging begun.
      // This way the box doesn't always align from the top left.
      // Making the action feel more natural.
      this.dragging.offsetX = event.clientX - this.position.x;
      this.dragging.offsetY = event.clientY - this.position.y;

      this.dragging.active = true;
    },
    stopDragging() {
      this.dragging = {
        active: false,
        startX: 0,
        startY: 0
      };
    },
    attemptDrag(event) {
      // Ignore if not dragging
      if(!this.dragging.active) return; 

      // Set the new position with the offset removed
      this.position.x = (event.clientX - this.dragging.offsetX);
      this.position.y = (event.clientY - this.dragging.offsetY);

      // Clamp the top and left of the window
      if(this.position.x < 0) this.position.x = 0;
      if(this.position.y < 0) this.position.y = 0;

      // ATTEMPT: Clamp the right and bottom of the window
      let vw =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      let vh =  Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

      if(vw !== 0 && this.position.x+100 > vw) this.position.x = vw-100;
      if(vh !== 0 && this.position.y+100 > vh) this.position.y = vh-100;
    },

    show() {
      this.shown = true;
      this.$emit("shown");
    },
    hide() {
      this.shown = false;
      this.$emit("hidden")
    },
    toggle() {
      // Can't just use this.shown = !this.shown as we also need to emit the event
      if(this.shown) {
        this.hide();
      } else {
        this.show();
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

  min-width: 200px;
  z-index: 10;

  background: var(--secondary-bg-color);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);

  &.dragging {
    cursor: grabbing;
  }
}

.window-frame .context-bar {
  color: #fff;
  background:rgba(0, 0, 0, .15);

  display: flex;
  flex-direction: row;

  .items {
    display: flex;
    flex-direction: row;

    margin-right: 2rem;

    .item {
      line-height: 200%;
      padding: 0 .5rem;
      user-select: none;

      &:hover {
        background-color:rgba(255, 255, 255, .05);
        cursor: default;
      }

      &.active {
        background-color: rgba(0, 0, 0, .5)
      }
    }
  }
}

.window-frame .window-body {
  background-color: var(--secondary-bg-color);
}

.context-bar .actions {
  margin-left: auto;
}

.close-button {
  background-color: rgba(0, 0, 0, .25);

  padding: .5rem 1rem;

  &:hover {
    background-color: red;
    color: white;

    cursor: default;
  }
}
</style>