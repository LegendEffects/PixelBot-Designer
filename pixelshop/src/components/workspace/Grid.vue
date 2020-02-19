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

        @mouseup="useTool(rowIndex, cellIndex)"
        @mouseover="attemptDraw(rowIndex, cellIndex)"
        @mouseleave="attemptDraw(rowIndex, cellIndex)"
      />

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

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
    getGrid() {
      // return this.$store.getters["workspace/gridDisplay"](this.id);
      return this.$store.state.workspace.frames[this.$store.state.workspace.currentFrame][this.id];
    },
    ...mapGetters({
      tool: 'workspace/currentTool',
      display: 'workspace/gridDisplay'
    })
  },

  methods: {
    useTool(row, col, dragging) {
      console.log(dragging);

      switch(this.tool) {
        case "pen":
          this.$store.commit("workspace/setPixel", {
            frame: this.$store.state.workspace.currentFrame,
            grid: this.id,
            row,
            col,
            colour: "#fff"
          });

      }
    },

    attemptDraw(row, col) {
      if(this.drawing) this.useTool(row, col, true);
    }
  }
}
</script>

<style scoped>
.grid {
  display: table;
  border-spacing: 1px;
  background: #37393f;
  border: 1px solid #37393f;
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