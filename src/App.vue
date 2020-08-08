<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
function createBlankGrid() {
  let blankGrid = {};
  for(let row = 0; row < 12; row++) {
    blankGrid[row] = {};

    for(let col = 0; col < 12; col++) {
      blankGrid[row][col] = "#000000";
    }
  }

  return blankGrid;
}

import logging from './logging'
import Home from './views/Home'

export default {
  components: {
    Home
  },

  created() {
    let blankGrid = createBlankGrid();

    // 4 Grids
    this.$set(this.$store.state, "blankFrame", {0: blankGrid, 1: blankGrid, 2: blankGrid, 3: blankGrid});

    // We have to do this to add the reactive getter/setter
    this.$set(this.$store.state.workspace, "frames", {});
    this.$set(this.$store.state.workspace.frames, 0, JSON.parse(JSON.stringify(this.$store.state.blankFrame)));

    // Say that the app is ready
    this.$store.state.ready = true;

    // Log the mode of the build
    if(process.env.NODE_ENV === 'development') {
			logging.log('Build', 'Running in development mode', 'warn');
		} else {
			logging.log('Build', 'Running in production mode', 'warn');
    }
  },
}
</script>

<style lang="scss">
  @import "./assets/scss/index.scss";
</style>