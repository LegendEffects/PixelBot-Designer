<template>
    <div class="workspace">
        <toolbox @updateWorkspace="updateWorkspace" v-if="layout.toolbox == 'left'" :mounted="layout.toolbox"></toolbox>

        <div class="gridContainer">
            <div class="gridRow">
                <grid :sizey="12" :sizex="12" :workspace="workspace"></grid>
                <grid :sizey="12" :sizex="12" :workspace="workspace"></grid>
            </div>
            <div class="gridRow">
                <grid :sizey="12" :sizex="12" :workspace="workspace"></grid>
                <grid :sizey="12" :sizex="12" :workspace="workspace"></grid>
            </div>
        </div>

        <toolbox @updateWorkspace="updateWorkspace" v-if="layout.toolbox == 'right'" :mounted="layout.toolbox"></toolbox>
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
            workspace: null,
        }},
        methods: {
            updateWorkspace(newWorkspace) {
                this.workspace = newWorkspace;
            }
        }
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