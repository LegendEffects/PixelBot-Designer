<template>
	<div id="app">
		<div class="workspace">	
			<div class="gridContainer">
				<div class="gridRow">
					<grid :sizey="12" :sizex="12"></grid>
					<grid :sizey="12" :sizex="12"></grid>
				</div>
				<div class="gridRow">
					<grid :sizey="12" :sizex="12"></grid>
					<grid :sizey="12" :sizex="12"></grid>
				</div>
			</div>

			<toolbox :mounted="layout.toolbox"></toolbox>
		</div>
	</div>
</template>


<script>
	import Grid from './components/Grid.vue'
	import Toolbox from './components/Toolbox.vue'

	export default {
		name: 'app',
		components: {
			Grid,
			Toolbox
		},
		data: () => {return{
			layout: {
				toolbox: 'right',
			},

		}}
	}
</script>

<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.workspace {
		display: flex;
		flex-direction: row;
	}

	.gridContainer {
		padding: 20px;
	}
	.gridRow {
		display: flex;
		flex-direction: row;
	}
</style>