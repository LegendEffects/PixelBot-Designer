<template>
	<div id="app">
		<div class="gridContainer">
			<grid :sizey="12" :sizex="12"></grid>
			<grid :sizey="12" :sizex="12"></grid>
		</div>
		<div class="gridContainer">
			<grid :sizey="12" :sizex="12"></grid>
			<grid :sizey="12" :sizex="12"></grid>
		</div>
	</div>
</template>


<script>
	import Grid from './components/Grid.vue'

	export default {
		name: 'app',
		components: {
			Grid
		}
	}
</script>

<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.gridContainer {
		display: flex;
		flex-direction: row;
	}
</style>