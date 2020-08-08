<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
function createBlankGrid() {
  let blankGrid = {};
  for(let row = 0; row < 12; row++) {
    blankGrid[row] = {};

    for(let col = 0; col < 12; col++) {
      blankGrid[row][col] = "#000";
    }
  }

  return blankGrid;
}

export default {
  created() {
    let blankGrid = createBlankGrid();

    // 4 Grids
    this.$set(this.$store.state, "blankFrame", {0: blankGrid, 1: blankGrid, 2: blankGrid, 3: blankGrid});

    // Replicate that to the first frame
    this.$store.state.workspace.frames[0] = JSON.parse(JSON.stringify(this.$store.state.blankFrame));

    // We have to do this to add the reactive getter/setter
    this.$set(this.$store.state.workspace, "frames", {});
    this.$set(this.$store.state.workspace.frames, 0, JSON.parse(JSON.stringify(this.$store.state.blankFrame)));

    // Say that the app is ready
    this.$store.state.ready = true;
  }
}
</script>

<style lang="scss">
  @import "./assets/scss/index.scss";
</style>