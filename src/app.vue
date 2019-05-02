<template>
    <div id="appContainer" class="layout">
        <modal v-if="show.credits" @close="show.credits = false">
            <h3 style="border-bottom: 2px solid #202225; padding-bottom: 5px;" slot="header">Credits</h3>
            <p slot="body">Editor Developed by LegendEffects<br><br>Original Editor by Claw Studios<br><br>Original PixelBot concept invented by Laboratory 424<br><br>First editor concept by CaptainPDA</p>
        </modal>
        
        <importpanel></importpanel>
        <exportpanel></exportpanel>
        <clearpanel></clearpanel>
        <settingspanel></settingspanel>

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
                pixelMap: [],
            },
            grids: null,
            settings: {
                changeOnColourChange: false,
                gridPixelSize: 35,
            },
            tool: {
                drawing: false,
                selected: 'pen',
                colour: '',
                lockScroll: false,
            },
            show: {
                credits: false
            },
            animation: {
                enabled: true,
                frame: 0,
                interval: null,
                previewing: null,
                delay: 500,
            }
        }},
        watch: {
            'settings.gridPixelSize': function() {
                for(let grid of this.grids) grid.changePixelDimensions(this.settings.gridPixelSize);
            }
        },
        methods: {
            startDrag() {
                this.tool.drawing = true;
                window.addEventListener('touchmove', this.touchDraw);
            },
            stopDrag() {
                this.tool.drawing = false;
                window.removeEventListener('touchmove', this.touchDraw);
            },
            touchDraw(e) {
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
            keyPressed(e) {
                if(e.which === 66) this.tool.selected = 'pen';
                else if(e.which === 69) this.tool.selected = 'eraser';
                else if(e.which === 73) this.tool.selected = 'eyedropper';
                else if(e.which === 71) this.tool.selected = 'fillbucket';

                else if(e.which === 219) {
                    if(this.animation.frame-1 < 0) this.animation.frame = this.grids[0].grid.length;
                    else this.animation.frame--;
                    this.refreshAllGrids();
                }

                else if(e.which === 221) {
                    this.animation.frame++;
                    for(let grid of this.grids) {
                        grid.frameChange();
                    }
                }
            },
            refreshAllGrids() {
                for(let grid of this.grids) {
                    grid.updateScreen();
                }
            },
            previewAnimation(type) {
                if(type === 'start') {
                    const totalFrames = this.grids[0].grid.length;
                    this.animation.interval = setInterval(function() {
                        if(this.animation.frame+1 > totalFrames) {
                            this.animation.frame = 0;
                        } else {
                            this.animation.frame++;
                        }
                        for(let grid of this.grids) {
                            grid.updateScreen();
                        }
                    }.bind(this), this.animation.delay);
                    this.animation.previewing = true;
                } else if(type === 'stop') {
                    clearTimeout(this.animation.interval);
                    this.animation.previewing = false;
                }
            }
        },
        mounted() {
            window.addEventListener('mousedown', this.startDrag);
            window.addEventListener('mouseup', this.stopDrag);
            window.addEventListener('touchstart', this.startDrag);
            window.addEventListener('touchend', this.stopDrag);

            // Fetch grids that are currently mounted in the dom
            this.grids = this.$children.filter(function(val) {
                if(val.grid) return true;
                else return false;
            });

            document.onkeyup = this.keyPressed;
        },
        created() {
            // Generate pixel map
            let final = [];
            for(let i=0;i<12;i++) {
                let row = [];
                for(let r=1;r<13;r++) row.push((i*12)+r);

                if(i % 2 === 1) final[i] = row.reverse();
                else final[i] = row;
            }
            this.grid.pixelMap = final.reverse();
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