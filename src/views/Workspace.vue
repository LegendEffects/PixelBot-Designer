<template>
    <div class="workspace" :class="'toolboxpos-'+layout.toolbox">
        <toolbox @updateWorkspace="updateWorkspace" v-if="layout.toolbox == 'left' || layout.toolbox == 'top'" :mounted="layout.toolbox"></toolbox>
        
        <div id="leftTopArea"></div>

        <div class="gridContainer">
            <div class="gridRow">
                <grid :grid-id="0" :sizey="12" :sizex="12" :workspace="workspace"></grid>
                <grid :grid-id="1" :sizey="12" :sizex="12" :workspace="workspace"></grid>
            </div>
            <div class="gridRow">
                <grid :grid-id="2" :sizey="12" :sizex="12" :workspace="workspace"></grid>
                <grid :grid-id="3" :sizey="12" :sizex="12" :workspace="workspace"></grid>
            </div>
        </div>

        <div id="bottomRightArea"></div>

        <toolbox @updateWorkspace="updateWorkspace" v-if="layout.toolbox == 'right' || layout.toolbox == 'bottom'" :mounted="layout.toolbox"></toolbox>
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
				toolbox: 'top',
            },
            grids: null,
            workspace: {
                tool: 'pen',
                colour: '#000',
                drawing: false,
                scrollLocked: false,
            },
        }},
        methods: {
            updateWorkspace(parts) {
                this.workspace.tool = parts.tool;
                this.workspace.colour = parts.colour;
            },

            dragStart() {
                this.workspace.drawing = true;
                window.addEventListener('touchmove', this.touchDraw);
            },
            dragStop() {
                this.workspace.drawing = false;
                window.removeEventListener('touchmove', this.touchDraw);
            },

            touchDraw(e) {
                if(this.workspace.drawing) {
                    let element = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
                    let backelement = element.parentElement.parentElement;
    
                    if(backelement.className == "grid") {
                        let gridid = backelement.attributes['grid-id'].nodeValue;
                        this.grids[gridid].useTool(element, true);
                    }
                }
            },

            isScrolllocked() {
                if(this.workspace.scrollLocked) return {overflow: 'hidden'}
                else return {overflow: 'auto'}
            }
        },
        mounted() {
            window.addEventListener('mousedown', this.dragStart);
            window.addEventListener('mouseup', this.dragStop);
            window.addEventListener('touchstart', this.dragStart);
            window.addEventListener('touchend', this.dragStop);

            this.grids = this.$children.filter(function(val) {
                if(val.$el.className == 'grid') return true;
                else return false;
            });
        }
	}
</script>

<style lang="scss">
	.workspace {
		display: flex;
        height: 100vh;
	}
    .toolboxpos-top, .toolboxpos-bottom {
        flex-direction: column;
    }
    .toolboxpos-left, .toolboxpos-right {
        flex-direction: row;
    }

	.gridContainer {
		padding: 20px;
        overflow: auto;
	}
	.gridRow {
		display: flex;
		flex-direction: row;
	}
</style>