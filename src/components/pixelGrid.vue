<template>
    <div class="grid">
        <div class="row" v-for="row in 12" :key="row">
            <div :style="style" v-for="index in 12" :key="index" @mouseup="toolUse" @mouseover="dragDraw" @mouseleave="dragDraw" @dragstart="preventDrag" class="e" draggable=false :data-id="getPixelID(row, index)" :data-row="row" :data-index="index"></div>
        </div>
    </div>
</template>

<script>

export default {
    name: "pixelgrid",
    data: () => {return {
        size: 12,
        grid: [],
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
        preventDrag(event) {
            event.preventDefault();
        },
        dragDraw(pixel) {
            if(this.$parent.tool.drawing && this.$parent.tool.selected !== 'fillbucket') {
                this.toolUse(pixel);
            }
        },
        toolUse(pixel, preventSrcElement) {
            const tool = this.$parent.tool;
            if(!preventSrcElement) {
                pixel = pixel.srcElement;
            }
            let pixelID = pixel.attributes['data-id'].nodeValue;

            if(tool.selected === 'pen' && tool.colour !== "") {
                this.grid[pixelID] = tool.colour;
                this.updatePixel(pixelID);
            }
            else if(tool.selected === 'eyedropper' && pixel.className !== "null") {
                tool.colour = this.grid[pixelID];
            }
            else if(tool.selected === 'eraser') {
                this.grid[pixelID] = 'e';
                this.updatePixel(pixelID);
            }
            else if(tool.selected === 'fillbucket' && tool.colour !== "") {
                this.fill_checkPixels(pixel);
                pixel.className = tool.colour;

                this.updateScreen();
            }
        },
        // Why not just let vue do it? It doesn't, there are too many pixels.
        updatePixel(id) {
            const el = this.$el.querySelector('[data-id="'+id+'"]');
            el.className = this.grid[id];
        },
        updateScreen() {
            for(let key in this.grid) {
                let el = this.$el.querySelector('[data-id="'+key+'"]');
                el.className = this.grid[key];
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
                let id = this.pixelGrid[pixelInfo.row-1][pixelInfo.column-2];
                let newPix = this.grid[id];
                this.fill_checkPixel(pixelInfo.currentColour, tool.colour, newPix, id);
            }
            // Right
            if(pixelInfo.column+1 <= 12) {
                let id = this.pixelGrid[pixelInfo.row-1][pixelInfo.column];
                let newPix = this.grid[id];
                this.fill_checkPixel(pixelInfo.currentColour, tool.colour, newPix, id);
            }
            // Top
            if(pixelInfo.row-1 >= 1) {
                let id = this.pixelGrid[pixelInfo.row-2][pixelInfo.column-1];
                let newPix = this.grid[id];
                this.fill_checkPixel(pixelInfo.currentColour, tool.colour, newPix, id);
            }
            // Bottom
            if(pixelInfo.row+1 <= 12) {
                let id = this.pixelGrid[pixelInfo.row][pixelInfo.column-1];
                let newPix = this.grid[id];
                this.fill_checkPixel(pixelInfo.currentColour, tool.colour, newPix, id);
            }
            return;
        },
        fill_checkPixel(wantedColour, changeToColour, pixel, id) {
            if(pixel === wantedColour) {
                const cache = pixel;
                this.grid[id] = changeToColour;
                this.fill_checkPixels(this.$el.querySelector('[data-id="'+id+'"]'), {colour: cache});
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
            let gridCache = [];
            for(let row of this.pixelGrid) {
                let rowC = [];
                for(let pixel of row) {
                    rowC.push(pixel);
                }
                gridCache.push(rowC);
            }
            
            return gridCache;
        },
        exportAsCommand() {
            return this.rle();
        },
        rle() {
            let grid = this.grid;

            let lastLetter = undefined;
            let currentLetter = undefined;
            let currentCount = undefined;
            let output = '';

            for(let i=0;i<grid.length;i++) {
                if(typeof lastLetter === 'undefined') {
                    lastLetter = grid[i];
                    currentCount = 1;

                    continue;
                }

                if(grid[i] !== lastLetter) {
                    output += currentCount+lastLetter;
                    lastLetter = grid[i];
                    currentCount = 1;

                    continue;
                }
                currentCount++;
            }
            return (output + (currentCount + lastLetter))
        },
        rleImport(str) {
            let output = str.replace(/(\d+)([a-zA-A])/g, function (match, num, letter) {
                var ret = '', i;
                for (i = 0; i < parseInt(num, 10); i++) {
                    ret += letter;
                }
                return ret;
            });
            
            for(let i=1;i<145;i++) {
                if(output[i-1] in this.$parent.pixelColours) {
                    this.grid[i] = output[i-1];
                } else {
                    this.grid[i] = 'e';
                }
            }
            this.updateScreen();
        }
    },
    created() {
        // Preload every single pixel with null
        for(let i=1;i<145;i++) {
            this.grid[i] = 'e';
        }

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
</style>