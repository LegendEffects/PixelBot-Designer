<template>
    <div class="grid" v-if="style !== null">
        <div class="row" v-for="row in sizey" :key="row">
            <div
                :style="style" 

                v-for="index in sizex" 
                :key="index" 
                
                draggable=false 
                @dragstart.prevent
                
                :data-row="row" 
                :data-index="index"
                
                @mouseup="useTool"
                @mouseover="dragDraw"
                @mouseleave="dragDraw">
            </div>
        </div>
    </div>
</template>

<script>
// https://stackoverflow.com/a/13937567
function rgbtohex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function fillTool(pixel, instance, colourOverride) {
    const info = {
        row: parseInt(pixel.attributes['data-row'].nodeValue),
        column: parseInt(pixel.attributes['data-index'].nodeValue),
        colour: rgbtohex(pixel.style.backgroundColor),
    }
    if(colourOverride) info.colour = colourOverride;

    // Check pixels around.
    // Left
    if(info.column-1 >= 1) {
        let pixelPart = instance.$el.querySelector(`div[data-row='${info.row}'][data-index='${info.column-1}']`);
        fillPixel(info.colour, instance.$store.state.workspace.colour, pixelPart, instance);
    }
    // Right
    if(info.column+1 <= instance.sizex) {
        let pixelPart = instance.$el.querySelector(`div[data-row='${info.row}'][data-index='${info.column+1}']`);
        fillPixel(info.colour, instance.$store.state.workspace.colour, pixelPart, instance);
    }
    // Up
    if(info.row-1 >= 1) {
        let pixelPart = instance.$el.querySelector(`div[data-row='${info.row-1}'][data-index='${info.column}']`);
        fillPixel(info.colour, instance.$store.state.workspace.colour, pixelPart, instance);
    }
    // Down
    if(info.row+1 <= instance.sizey) {
        let pixelPart = instance.$el.querySelector(`div[data-row='${info.row+1}'][data-index='${info.column}']`);
        fillPixel(info.colour, instance.$store.state.workspace.colour, pixelPart, instance);
    }

    instance.$root.$emit('gridUpdated');
}
function fillPixel(fillingColour, fillToColour, pixel, instance) {
    if(rgbtohex(pixel.style.backgroundColor) === fillingColour) {
        const cache = pixel.style.backgroundColor;
        pixel.style.backgroundColor = fillToColour;
        fillTool(pixel, instance, rgbtohex(cache));
        
        return true;
    }
    return;
}

export default {
    name: 'grid',
    props: ['sizex', 'sizey'],
    data() {return {
        style: null,
    }},
    methods: {
        useTool(pixel, ignoreSrc, wasDragging) {
            if(!ignoreSrc) {
                pixel = pixel.target;
            }
            
            switch(this.$store.state.workspace.tool) {
                case 'pen':
                    pixel.style.backgroundColor = this.$store.state.workspace.colour;
                    this.$root.$emit('gridUpdated');
                    break;
                case 'eraser':
                    pixel.style.backgroundColor = '#000';
                    this.$root.$emit('gridUpdated');
                    break;
                case 'eyedropper':
                    // this.$parent.workspace.colour = rgbtohex(pixel.style.backgroundColor);
                    this.$root.$emit('customColourChange', rgbtohex(pixel.style.backgroundColor));
                    break;

                case 'fill':
                    if(wasDragging) return; // Prevent dragging with a fill bucket... that would probably kill the browser.
                    if(this.$store.state.workspace.colour == pixel.style.backgroundColor) return; // Prevent Callstack overflow

                    fillTool(pixel, this);
                    pixel.style.backgroundColor = this.$store.state.workspace.colour;
                    break;
            }
        },
        dragDraw(pixel) {
            if(this.$store.state.workspace.drawing) {
                this.useTool(pixel, false, true);
            }
        },
        export() {
            let final = [];
            for(let i=1;i<this.sizey+1;i++) {
                // Per row
                let row = [];
                for(let x=1;x<this.sizex+1;x++) {
                    // Per column
                    row.push(rgbtohex(this.$el.querySelector(`div[data-row='${i}'][data-index='${x}']`).style.backgroundColor));
                }
                final.push(row);
            }

            return final;
        },
        import(array) {
            for(let i=1;i<this.sizey+1;i++) {
                // Per row
                for(let x=1;x<this.sizex+1;x++) {
                    // Per column
                    this.$el.querySelector(`div[data-row='${i}'][data-index='${x}']`).style.backgroundColor = array[i-1][x-1]; 
                }
            }
        }
    },
    created() {

        this.style = {
            display: 'table-cell',
            width: this.$store.state.settings.pixelSize+'px',
            height: this.$store.state.settings.pixelSize+'px',

            minWidth: this.$store.state.settings.pixelSize+'px',
            minHeight: this.$store.state.settings.pixelSize+'px',
            backgroundColor: '#000',
        }
    }
}
</script>

<style scoped>
.grid {
    display: table;
    border-spacing: 1px;
    background: #37393f;
    border:1px solid #37393f;
    overflow: auto;
}
.row {
    display: table-row;
}
</style>
