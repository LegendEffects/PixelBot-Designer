<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
	#app {
		height: 100%;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:root {
		--main-bg-color: #37393f;
		--secondary-bg-color: #202225;
		--accent-color: #ffcd00;
	}
</style>