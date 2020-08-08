<template>
  <div class="grid-array" @mousedown.left="drawing = true" @mouseup.left="drawing = false" @mouseleave="drawing = false" @touchstart="drawing = true" @touchend="drawing = false" @touchmove="touchMove">
    <div class="row">
      <grid ref="grid-0" :id="0" :drawing="drawing" />
      <grid ref="grid-1" :id="1" :drawing="drawing" />
    </div>
    
    <div class="row">
      <grid ref="grid-2" :id="2" :drawing="drawing" />
      <grid ref="grid-3" :id="3" :drawing="drawing" />
    </div>
  </div>
</template>

<script>
import Grid from "./Grid"

export default {
  components: {
    Grid
  },

  data() {return {
    drawing: false
  }},

  methods: {
    touchMove(e) {
      if(this.drawing) {
        
        const element = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        if(element === null || element.parentElement === null || element.parentElement.parentElement === null) {
          this.drawing = false;
          return;
        }

        const backElement = element.parentElement.parentElement;

        if(backElement.className === "grid") {
          e.preventDefault();

          const gridId = backElement.attributes['grid-id'].nodeValue;

          const cellRow = element.attributes['data-row'].nodeValue;
          const cellCol = element.attributes['data-col'].nodeValue;

          this.$refs["grid-" + gridId].useTool(cellRow, cellCol);
        }

      }
    }

  }
}
</script>

<style scoped>
.grid-array {
  display: flex;
  flex-direction: column;

  padding: 2rem;

  overflow: auto;
}

.grid-array .row {
  display: flex;
  flex-direction: row;
}
</style>