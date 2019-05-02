<template>
    <div class="toolbar">
        <div>
            <span class="heading" @click="toggleExpandedState('palette')">Colour Palette<i class="stateChevron" :class="isExpanded('palette')"></i></span>
            <div v-if="sections.palette.expanded">
                <palette></palette>
            </div>
        </div>
        <div class="section">
            <span class="heading" @click="toggleExpandedState('tools')">Tools <i class="stateChevron" :class="isExpanded('tools')"></i></span>
            <div v-if="sections.tools.expanded">
                <button class="tool" title="Pen (b)" :class="isSelected('pen')" @click="changeTool('pen')"><i class="fas fa-pen"></i></button>
                <button class="tool" title="Eraser (e)" :class="isSelected('eraser')" @click="changeTool('eraser')"><i class="fas fa-eraser"></i></button>
                <button class="tool" title="Eyedropper (i)" :class="isSelected('eyedropper')" @click="changeTool('eyedropper')"><i class="fas fa-eye-dropper"></i></button>
                <button class="tool newRow" title="Fill Bucket (g)" :class="isSelected('fillbucket')" @click="changeTool('fillbucket')"><i class="fas fa-fill"></i></button>
            </div>
        </div>
        <div class="section">
            <span class="heading" @click="toggleExpandedState('commands')">Commands <i class="stateChevron" :class="isExpanded('commands')"></i></span>
            <div v-if="sections.commands.expanded">
                <button class="tool" title="Lock Scrolling (For Touch)" :class="isScrollLocked()" @click="changeScrollState()"><i class="fas fa-lock"></i></button>
                <button class="tool" title="Clear Grid(s)" @click="root.$emit('toggleClearPanel')"><i class="fas fa-trash"></i></button>
            </div>
        </div>
        <div class="section">
            <span class="heading" @click="toggleExpandedState('animation')">Animation <i class="stateChevron" :class="isExpanded('animation')"></i></span>
            <div v-if="sections.animation.expanded">
                <span class="subHeading">Enabled</span>
                <label class="switch" for="animEnabled">
                    <input type="checkbox" id="animEnabled" v-model="root.animation.enabled" />
                    <div class="slider round"></div>
                </label>

                <span class="subHeading">Frame</span>
                <input type="number" min="0" v-model="root.animation.frame" :disabled="!root.animation.enabled" @change="frameChange">
                <span class="subHeading">Animation delay (ms)</span>
                <input type="number" min="0" v-model="root.animation.delay" :disabled="!root.animation.enabled">
                <button class="actionButton" style="margin-top: 10px;" @click="root.previewAnimation('start')" v-if="!root.animation.previewing">Play</button>
                <button class="actionButton" style="margin-top: 10px;" @click="root.previewAnimation('stop')" v-else>Stop</button>
            </div>
        </div>
        <div class="section">
            <span class="heading" @click="toggleExpandedState('import_export')">Import/Export <i class="stateChevron" :class="isExpanded('import_export')"></i></span>
            <div v-if="sections.import_export.expanded">
                <button class="actionButton" @click="root.$emit('toggleImportPanel')">Import</button>
                <button class="actionButton" @click="root.$emit('toggleExportPanel')">Export</button>
            </div>
        </div>

        <div class="watermark section">
            <a href="#" @click="root.$emit('toggleSettingsPanel')">Settings</a>
            <a href="https://github.com/LegendEffects/PixelBot-Designer">Github</a>
            <a href="#" @click="root.show.credits = true">Credits</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'toolbox',
    data() {
        return {
            root: null,
            gridSize: 12,

            sections: {
                palette: {
                    expanded: true,
                },
                tools: {
                    expanded: true,
                },
                commands: {
                    expanded: true,
                },
                animation: {
                    expanded: true,
                },
                import_export: {
                    expanded: true,
                }
            }
        }
    },
    methods: {
        // Section Managers
        isExpanded(section) {
            if(this.sections[section].expanded) return 'fas fa-chevron-down';
            else return 'fas fa-chevron-right';
        },
        toggleExpandedState(section) {
            this.sections[section].expanded = !this.sections[section].expanded;
        },

        // Tool Management
        isSelected(tool) {
            if(this.root.tool.selected === tool) return ' active';
            else return '';
        },
        changeTool(tool) {
            this.root.tool.selected = tool;
        },

        // Scroll Locking
        isScrollLocked() {
            if(this.root.tool.lockScroll) return ' active';
            else return '';
        },
        changeScrollState() {
            this.root.tool.lockScroll = !this.root.tool.lockScroll;
            this.root.tool.drawing = this.root.tool.lockScroll;
        },

        frameChange() {
            for(let grid of this.root.grids) grid.frameChange();
        }
    },
    watch: {
        gridSize() {
            this.root.grid.size = this.gridSize;
        },
    },
    beforeMount() {
        this.root = this.$root.$children[0];
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
    .stateChevron {
        float: right;
    }
</style>