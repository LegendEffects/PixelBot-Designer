<template>
    <div class="workspace">
        <toolbox v-if="layout.toolbox == 'left'" :mounted="layout.toolbox"></toolbox>

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

        <toolbox v-if="layout.toolbox == 'right'" :mounted="layout.toolbox"></toolbox>
    </div>
</template>


<script>
	import Grid from '../components/Grid.vue'
	import Toolbox from '../components/Toolbox.vue'

	export default {
		name: 'workspace',
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