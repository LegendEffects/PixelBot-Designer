<template>
  <canvas ref="canvas" width="123" height="123" @click="$emit('select', fid)" />
</template>

<script>
export default {
  props: {
    frame: {
      type: Object,
      default() {
        return {};
      }
    },
    fid: {
      type: Number,
      default: 0
    }
  },

  watch: {
    '$props.frame': {
      handler: function() {
        this.renderGrids();
      },
      deep: true
    }
  },

  mounted() {
    this.renderGrids();
  },

  methods: {
    renderGrids() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.renderGrid(ctx, this.frame[0], 0, 0);
      this.renderGrid(ctx, this.frame[1], 62, 0);

      this.renderGrid(ctx, this.frame[2], 0, 62);
      this.renderGrid(ctx, this.frame[3], 62, 62);
    },

    renderGrid(ctx, grid, offsetX, offsetY) {
      let lastY = offsetY;

      for(const rowIndex in grid) {
        const row = grid[rowIndex];
        let lastX = offsetX;

        for(const cellIndex in row) {
          const cell = row[cellIndex];

          ctx.fillStyle = cell;
          ctx.fillRect(lastX, lastY, 4, 4);

          lastX += 5;
        }

        lastY += 5;
      }
    }
  }
}
</script>

<style scoped>
.grid-array {
  display: flex;
  flex-direction: column;
}

.grid-array .row {
  display: flex;
  flex-direction: row;
}
</style>