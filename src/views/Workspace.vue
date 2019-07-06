<template>
    <div class="workspace" v-if="layout !== null">
        <portal :to="'toolbox-'+layout.toolbox">
            <toolbox :mounted="layout.toolbox"></toolbox>
        </portal>
        <portal :to="'timeline-'+layout.timeline">
            <timeline v-show="$store.state.workspace.timeline"></timeline>
        </portal>

        <mounting-points>
            <div class="gridContainer">
                <div class="gridRow">
                    <grid :grid-id="0" :sizey="12" :sizex="12"></grid>
                    <grid :grid-id="1" :sizey="12" :sizex="12"></grid>
                </div>
                <div class="gridRow">
                    <grid :grid-id="2" :sizey="12" :sizex="12"></grid>
                    <grid :grid-id="3" :sizey="12" :sizex="12"></grid>
                </div>
            </div>
        </mounting-points>

    </div>
</template>


<script>
	import Grid from '../components/Grid'
    import Toolbox from '../components/Toolbox'
    import Timeline from '../components/Timeline'
    import MountingPoints from '../components/MountingPoints'

	export default {
		name: 'workspace',
		components: {
			Grid,
            Toolbox,
            Timeline,
            MountingPoints
		},
		data: () => {return{
			layout: null,
            grids: null,
        }},
        methods: {
            dragStart() {
                this.$store.state.workspace.drawing = true;
                window.addEventListener('touchmove', this.touchDraw);
            },
            dragStop() {
                this.$store.state.workspace.drawing = false;
                window.removeEventListener('touchmove', this.touchDraw);
            },

            touchDraw(e) {
                if(this.$store.state.workspace.drawing) {
                    let element = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
                    let backelement = element.parentElement.parentElement;
    
                    if(backelement.className == "grid") {
                        let gridid = backelement.attributes['grid-id'].nodeValue;
                        this.grids[gridid].useTool(element, true);
                    }
                }
            },

            isScrolllocked() {
                if(this.$store.state.workspace.scrollLocked) return {overflow: 'hidden'}
                else return {overflow: 'auto'}
            }
        },
        mounted() {
            this.layout = this.$store.state.settings.layout;

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

    // .showBorder {
    //     background-color: rgb(255, 0, 0);
    // }
    // .extendWidth {
    //     width: 100%;
    //     height: 20px;
    // }
    // .extendHeight {
    //     height: 100%;
    //     width: 20px;
    // }
</style>