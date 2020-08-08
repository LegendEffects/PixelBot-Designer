<template>
  <div class="grid" :grid-id="id">
    <div class="row" v-for="(row, rowIndex) of display(id)" :key="rowIndex">
      
      <div 
        class="cell" 
        
        v-for="(cell, cellIndex) of row" 
        :key="cellIndex"

        :style="{backgroundColor: cell}"

        :data-row="rowIndex"
        :data-col="cellIndex"

        draggable="false"
        @dragstart.prevent

        @mouseup="useTool(rowIndex, cellIndex, $event)"
        @mouseover="attemptDraw(rowIndex, cellIndex, $event)"
        @mouseleave="attemptDraw(rowIndex, cellIndex, $event)"
      />

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    drawing: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters({
      tool: 'workspace/currentTool',
      display: 'workspace/gridDisplay',
      currentFrame: 'workspace/currentFrame',

      foregroundColour: 'workspace/foregroundColour'
    })
  },

  methods: {
    ...mapActions({
      setPixel: "workspace/modifyPixel",
      fillArea: "workspace/fillPixel"
    }),
    ...mapMutations({
      setForegroundColour: 'workspace/setForegroundColour',
      setBackgroundColour: 'workspace/setBackgroundColour'
    }),

    useTool(row, col, event, dragging) {
      switch(this.tool) {
        case "pen":
          this.quickSetPixel(row, col, this.foregroundColour);
          break;
        case "eraser":
          this.quickSetPixel(row, col, '#000000');
          break;
        case "eyeDropper":
          // Background colour should be set
          if(event.altKey) {
            this.setBackgroundColour(this.display(this.id)[row][col]);      
          } else {
            this.setForegroundColour(this.display(this.id)[row][col]);
          }
          break;
        case "fillBucket":
          if(dragging) return;
          this.fillArea({
            grid: this.id,
            row,
            col,
            colour: this.foregroundColour,
            targetColour: this.display(this.id)[row][col]
          });
          // this.fillBucket(row, col);
      }
    },

    attemptDraw(row, col, event) {
      if(this.drawing) this.useTool(row, col, event, true);
    },

    quickSetPixel(row, col, colour) {
      this.setPixel({
        frame: this.currentFrame,
        grid: this.id,
        row,
        col,
        colour
      })
    }
  }
}
</script>

<style scoped>
.grid {
  display: table;
  border-spacing: 1px;
  background: var(--main-bg-color);
  border: 1px solid var(--main-bg-color);
}

.grid .row {
  display: table-row;
}

.grid .row .cell {
  display: table-cell;

  width: 35px;
  height: 35px;
  min-width: 35px;
  min-height: 35px;
}
</style>