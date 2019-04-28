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
                    <p style="overflow: auto; padding: 20px;">!pb{{index}}d.{{pixelbot}}</p>
                    <button class="actionButton darker" @click="copyCommand('!pb'+index+'d.'+pixelbot)"><i class="fas fa-copy"></i></button>
                </span>
                <span>
                    <p style="overflow: auto; padding: 20px;">!pbd{{getAllGrids()}}</p>
                    <button class="actionButton darker" @click="copyCommand('!pbd'+getAllGrids())"><i class="fas fa-copy"></i></button>
                </span>
            </p>
        </modal>
        <modal v-if="show.import.show" @close="show.import.show = false">
            <h3 style="border-bottom: 2px solid #202225; padding-bottom: 5px;" slot="header">Import <input id="importGrid" type="number" min="1" max="4" value="1"></h3>
            <p slot="body">
                <textarea id="importArea"></textarea>
                <button class="activeButton darker" @click="importText"><i class="fas fa-upload"></i></button>
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
                a: '#ff0000',
                b: '#008000',
                c: '#0000ff',
                d: '#fff',
                e: '#000',
                f: '#ffff00',
                g: '#800000',
                h: '#800080',
                i: '#6441a5',
                j: '#000080',
                k: '#006400',
                l: '#ffd700',
                m: '#f0e68c',
                n: '#daa520',
                o: '#00ffff',
                p: '#008080',
                q: '#00ced1',
                r: '#ffa500',
                s: '#ff8c00',
                t: '#ff4500',
                u: '#ffc0cb',
                v: '#ff1393',
                w: '#ffa07a',
                x:'#858d86',
                y: '#4c504d',
                
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
                },
                import: {
                    show: false,
                    content: ''
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
            getAllGrids() {
                let final = '';
                for(let grid of this.grids) {
                    final += '.'+grid.exportAsCommand();
                }
                return final;
            },
            isScrollLocked() {
                if(this.tool.lockScroll === true) return {overflow: 'hidden'};
                else return {overflow: 'auto'};
            },
            copyCommand(text) {
                this.$copyText(text);
            },
            importText() {
                let selected = document.getElementById('importGrid').value;
                this.grids[selected-1].rleImport(document.getElementById('importArea').value);
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