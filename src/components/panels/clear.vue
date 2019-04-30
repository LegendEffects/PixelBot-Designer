<template>
    <modal v-if="shown" @close="shown = false">
        <div style="border-bottom: 2px solid #202225; padding-bottom: 5px;" slot="header"><h3 style="display: inline">Clear</h3> <span style="float: right; line-height: 25px">Select grids to clear</span></div>
        <div slot="body">
            <div class="gridSelect">
                <div class="gridRow">
                    <div class="modelGrid" :class="isGridSelected(0)" @click="toggleGrid(0)"></div>
                    <div class="modelGrid" :class="isGridSelected(1)" @click="toggleGrid(1)"></div>
                </div>
                <div class="gridRow">
                    <div class="modelGrid" :class="isGridSelected(2)" @click="toggleGrid(2)"></div>
                    <div class="modelGrid" :class="isGridSelected(3)" @click="toggleGrid(3)"></div>
                </div>
            </div>

            <button class="actionButton darker" @click="submit" :disabled="!anySelected()">Clear Selected</button>
        </div>
    </modal>
</template>

<script>
export default {
    name: 'clearpanel',
    data: () => {return{
        shown: false,
        root: null,
        properties: {
            modelGrids: {
                0: {selected: false},
                1: {selected: false},
                2: {selected: false},
                3: {selected: false},
            }
        }
    }},
    methods: {
        toggleState() {
            this.shown = !this.shown;
        },
        isGridSelected(grid) {
            if(this.properties.modelGrids[grid].selected) return 'active';
            else return '';
        },
        anySelected() {
            let grids = this.properties.modelGrids;
            if(grids[0].selected || grids[1].selected || grids[2].selected || grids[3].selected) return true;
            else return false;
        },
        toggleGrid(grid) {
            this.properties.modelGrids[grid].selected = !this.properties.modelGrids[grid].selected;
        },
        submit() {
            if(this.anySelected()) {
                for(let key in this.properties.modelGrids) {
                    if(this.properties.modelGrids[key].selected)
                        this.root.grids[key].eraseGrid()
                }
            }
        }
    },
    mounted() {
        this.root = this.$root.$children[0];
        this.root.$on('toggleClearPanel', this.toggleState);
    }
}
</script>

<style scoped>
.gridSelect {
    display: block;
}
.gridRow {
    display: block;
}
.modelGrid {
    background: #202225;
    width: 40px;
    min-width: 40px;

    height: 40px;
    min-height: 40px;
    display: inline-block;

    border: 2px solid #202225;
}
.modelGrid.active {
    background: gold;
}
.modelGrid:hover {
    cursor: pointer;
}
</style>