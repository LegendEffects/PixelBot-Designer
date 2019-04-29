<template>
    <div class="toolbar">
        <div class="paletteSection">
            <span class="heading">Colour Palette</span>
            <palette :colours="pixelColours"></palette>
        </div>
        <div class="toolSelection section">
            <span class="heading">Tool Selection</span>
            <button class="tool" title="Pen (b)" :class="isSelected('pen')" @click="changeTool('pen')"><i class="fas fa-pen"></i></button>
            <button class="tool" title="Eraser (e)" :class="isSelected('eraser')" @click="changeTool('eraser')"><i class="fas fa-eraser"></i></button>
            <button class="tool" title="Eyedropper (i)" :class="isSelected('eyedropper')" @click="changeTool('eyedropper')"><i class="fas fa-eye-dropper"></i></button>
            <button class="tool newRow" title="Fill Bucket (g)" :class="isSelected('fillbucket')" @click="changeTool('fillbucket')"><i class="fas fa-fill"></i></button>

            <button class="tool newRow" title="Lock Scrolling (For Touch)" :class="lockScrollState()" @click="changeScrollState()"><i class="fas fa-lock"></i></button>
        </div>
        <div class="gridSettings section">
            <span class="heading">Grid Settings</span>
            <span class="subHeading">Pixel Size (px)</span>
            <input type="number" v-model="pixelSize">
        </div>
        <!-- <div class="gridSettings section">
            <span class="heading">Animation</span>
            <span class="subHeading">Frame</span>
            <input type="number" value="1">
            <button class="actionButton" style="margin-top: 10px;">Play</button>
        </div> -->
        <div class="gridSettings section">
            <span class="heading">Import/Export</span>

            <button class="actionButton" @click="importGrids()">Import</button>
            <button class="actionButton" @click="exportGrids()">Export</button>
        </div>

        <div class="watermark section">
            <a href="https://github.com/LegendEffects/PixelBot-Designer">Github</a>
            <a href="#" @click="showCredits()">Credits</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'toolbox',
    data() {
        return {
            pixelColours: this.$parent.pixelColours,
            pixelSize: 35,
            gridSize: 12
        }
    },
    methods: {
        isSelected(tool) {
            if(this.$parent.tool.selected === tool) return ' active';
            else return '';
        },
        changeTool(tool) {
            this.$parent.tool.selected = tool;
        },
        showCredits() {
            this.$parent.show.credits = true;
        },
        exportGrids() {
            // const grids = this.$parent.$children.filter(function(val) {
            //     if(val.grid) return true;
            //     else return false;
            // });

            // let final = {};
            // let count = 0;
            // for(let grid of grids) {
            //     count++;
            //     final[count] = grid.exportAsCommand();
            // }

            // this.$parent.show.export.content = final;
            // this.$parent.show.export.show = true;
            this.$parent.$emit('toggleExportPanel');
        },
        importGrids() {
            this.$parent.$emit('toggleImportPanel');
        },
        lockScrollState() {
            if(this.$parent.tool.lockScroll) return ' active';
            else return '';
        },
        changeScrollState() {
            this.$parent.tool.lockScroll = !this.$parent.tool.lockScroll;
            this.$parent.tool.drawing = this.$parent.tool.lockScroll;
        }
    },
    watch: {
        pixelSize() {
            this.$parent.grid.pixelSize = this.pixelSize;
        },
        gridSize() {
            this.$parent.grid.size = this.gridSize;
        },
    }

}
</script>

<style scoped>
    .tool {
        background: #2f3136;
        border: #2f3136 solid 2px;
        padding: .5rem;
    }
    .tool:hover {
        cursor: pointer;
    }
    .tool:focus {
        outline: none;
    }
    .tool.newRow {
        margin-top: 5px;
    }
    .tool i {
        color: #d6d6d6;
        font-size: 32px;
    }
</style>