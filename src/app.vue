<template>
    <div id="appContainer" class="layout">
        <modal v-if="show.credits" @close="show.credits = false">
            <h3 style="border-bottom: 2px solid #202225; padding-bottom: 5px;" slot="header">Credits</h3>
            <p slot="body">Editor Developed by LegendEffects<br><br>Original Editor by Claw Studios<br><br>Original PixelBot concept invented by Laboratory 424<br><br>First editor concept by CaptainPDA</p>
        </modal>
        <modal v-if="show.export.show" @close="show.export.show = false">
            <h3 style="border-bottom: 2px solid #202225; padding-bottom: 5px;" slot="header">Export</h3>
            <p slot="body">
                <span v-for="(pixelbot, index) in show.export.content" :key="pixelbot.id">
                    <pre style="overflow: auto; padding: 20px;">!pb{{index}}{{pixelbot}}</pre>
                    <button class="actionButton darker" @click="copyCommand('!pb'+index+pixelbot)"><i class="fas fa-copy"></i></button>
                </span>
            </p>
        </modal>

        <div class="combiGrid" :style="isScrollLocked()">
            <div class="row">
                <pixelgrid :grid-id="0"></pixelgrid>
                <pixelgrid :grid-id="1"></pixelgrid>
            </div>
            <div class="row">
                <pixelgrid :grid-id="2"></pixelgrid>
                <pixelgrid :grid-id="3"></pixelgrid>
            </div>
        </div>
        <toolbox></toolbox>
    </div>
</template>

<script>
    export default {
        name: "app",
        data: () => {return {
            pixelColours: {
                'w':  '#fff',
                'r':  '#ff0000',
                'g':  '#008000',
                'x':  '#000',
                'y':  '#ffff00',
                'm':  '#800000',
                'p':  '#800080',
                'tp': '#6441a5',
                'dg': '#006400',
                'or': '#f0e68c',
                'pi': '#daa520',
                'n':  '#000080',
                'b':  '#0000ff',
                'go': '#008080',
                'k':  '#00ced1',
                'gr': '#00ffff',
                'cy': '#ffa500',
                'te': '#ffd700',
                'do': '#ff8c00',
                'or': '#ffc0cb',
            },
            grid: {
                size: 12,
                pixelSize: 35
            },
            grids: null,
            tool: {
                drawing: false,
                selected: 'pen',
                colour: '',
                lockScroll: false,
            },
            show: {
                credits: false,
                export: {
                    show: false,
                    content: []
                }
            }
        }},
        watch: {
            'grid.pixelSize': function() {
                for(let i=0; i<4; i++) {
                    this.$children[i].changePixelDimensions(this.grid.pixelSize);
                }
            }
        },
        methods: {
            startDrag() {
                this.tool.drawing = true;
                window.addEventListener('touchmove', this.touchdraw);
            },
            stopDrag() {
                this.tool.drawing = false;
                window.removeEventListener('touchmove', this.touchdraw);
            },
            touchdraw(e) {
                if(this.tool.drawing && this.tool.lockScroll) {
                    let element = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
                    let backelement = element.parentElement.parentElement;
                    if(backelement.className === 'grid') {
                        let gridid = backelement.attributes['grid-id'].nodeValue;
                        this.grids[gridid].toolUse(element, true);
                    }
                }
            },
            isScrollLocked() {
                if(this.tool.lockScroll === true) return {overflow: 'hidden'};
                else return {overflow: 'auto'};
            },
            copyCommand(text) {
                this.$copyText(text);
            },
            keyPressed(e) {
                if(e.which === 66) this.tool.selected = 'pen';
                else if(e.which === 69) this.tool.selected = 'eraser';
                else if(e.which === 73) this.tool.selected = 'eyedropper';
                else if(e.which === 71) this.tool.selected = 'fillbucket';
            }
        },
        mounted() {
            window.addEventListener('mousedown', this.startDrag);
            window.addEventListener('mouseup', this.stopDrag);
            window.addEventListener('touchstart', this.startDrag);
            window.addEventListener('touchend', this.stopDrag);

            this.grids = this.$children.filter(function(val) {
                if(val.grid) return true;
                else return false;
            });

            document.onkeyup = this.keyPressed;
        }
    }
</script>

<style scoped>
.grid {
    display: inline-block;
    margin: -5px;
}
.combiGrid {
    width: calc(100% - 240px);
    padding: 20px;
    white-space: nowrap;
    overflow-x: auto;
}
</style>