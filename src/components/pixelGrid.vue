<template>
    <div class="grid">
        <div class="row" v-for="row in 12" :key="row">
            <div :style="style" v-for="index in 12" :key="index" @mouseup="toolUse" @mouseover="dragDraw" @mouseleave="dragDraw" class="null" :data-id="getPixelID(row, index)" :data-row="row" :data-index="index"></div>
        </div>
    </div>
</template>

<script>

export default {
    name: "pixelgrid",
    data: () => {return {
        grid: [],
        size: 12,
        pixelGrid: [],
        style: {
            display: 'table-cell',
            width: '35px',
            height: '35px',
            'min-width': '35px',
            'min-height': '35px',
        }
    }},
    methods: {
        getPixelID(row, index) {
            return this.pixelGrid[row-1][index-1];
        },
        dragDraw(pixel) {
            if(this.$parent.tool.drawing && this.$parent.tool.selected !== 'fillbucket') {
                this.toolUse(pixel);
            }
        },
        toolUse(pixel) {
            const tool = this.$parent.tool;

            if(tool.selected === 'pen' && tool.colour !== "") {
                pixel.srcElement.className = tool.colour;
            }
            else if(tool.selected === 'eyedropper' && pixel.srcElement.className !== "null") {
                tool.colour = pixel.srcElement.className;
            }
            else if(tool.selected === 'eraser') {
                pixel.srcElement.className = 'null';
            }
            else if(tool.selected === 'fillbucket' && tool.colour !== "") {
                this.fill_checkPixels(pixel.srcElement);
                pixel.srcElement.className = tool.colour;
            }
        },
        fill_checkPixels(pixel, overrides) {
            const pixelInfo = {
                row: parseInt(pixel.attributes['data-row'].nodeValue),
                column: parseInt(pixel.attributes['data-index'].nodeValue),
                reversed: parseInt(pixel.attributes['data-row'].nodeValue)%2 === 1,
                currentColour: pixel.className
            }
            if(overrides && overrides.colour) {
                pixelInfo.currentColour = overrides.colour;
            }

            const dom = this.$el;
            const tool = this.$parent.tool;
            // Left
            if(pixelInfo.column-1 >= 1) {
                let newPix = dom.querySelector('[data-id="'+this.pixelGrid[pixelInfo.row-1][pixelInfo.column-2]+'"]');
                this.fill_checkPixel(pixelInfo.currentColour, tool.colour, newPix);
            }
            // Right
            if(pixelInfo.column+1 <= 12) {
                let newPix = dom.querySelector('[data-id="'+this.pixelGrid[pixelInfo.row-1][pixelInfo.column]+'"]');
                this.fill_checkPixel(pixelInfo.currentColour, tool.colour, newPix);
            }
            // Top
            if(pixelInfo.row-1 >= 1) {
                let newPix = dom.querySelector('[data-id="'+this.pixelGrid[pixelInfo.row-2][pixelInfo.column-1]+'"]');
                this.fill_checkPixel(pixelInfo.currentColour, tool.colour, newPix);
            }
            // Bottom
            if(pixelInfo.row+1 <= 12) {
                let newPix = dom.querySelector('[data-id="'+this.pixelGrid[pixelInfo.row][pixelInfo.column-1]+'"]');
                this.fill_checkPixel(pixelInfo.currentColour, tool.colour, newPix);
            }
            return;
        },
        fill_checkPixel(wantedColour, changeToColour, pixel) {
            if(pixel.className === wantedColour) {
                const cache = pixel.className;
                pixel.className = changeToColour;
                this.fill_checkPixels(pixel, {colour: cache});
                return true;
            }
            return;
        },
        changePixelDimensions(size) {
            this.style.width = size+'px';
            this.style['min-width'] = size+'px';

            this.style.height = size+'px';
            this.style['min-height'] = size+'px';
        },
        changeGridSize(size) {
            this.size = size;
        },
        fetchCurrentDisplay() {
            const gridElement = this.$el;
            let gridCache = [];

            for(let row of gridElement.childNodes) {
                if(row.className === 'row') {
                    let rowCache = [];
                    for(let pixel of row.childNodes) {
                        rowCache.push(pixel)
                    }
                    gridCache.push(rowCache);
                }
            }
            return gridCache;
        },
        exportAsCommand() {
            let command = '';
            let display = this.fetchCurrentDisplay()

            for(let row of display) {
                for(let pixel of row) {
                    if(pixel.className !== 'null') {
                        command += '.'+pixel.className+pixel.attributes['data-id'].nodeValue;
                    }
                }
            }

            return command;
        }
    },
    created() {
        // Generate the 'serpentine' pattern, this maps the pixel ids
        let final = [];
        for(let i=0;i<12;i++) {
            let row = [];
            for(let r=1;r<13;r++) row.push((i*12)+r);

            if(i % 2 === 1) final[i] = row.reverse();
            else final[i] = row;
        }
        this.pixelGrid = final.reverse();
    }
}

</script>

<style scoped>
.grid {
    display: table;
    border-spacing: 1px;
    background: #37393f;
    border: 5px solid #37393f;
    overflow: auto;
}
.row {
    display: table-row;
}
.null {
    background: #000;
}
</style>