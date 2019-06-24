<template>
    <div class="grid">
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
export default {
    name: 'grid',
    props: ['sizex', 'sizey', 'workspace'],
    data() {return {
        style: {
            display: 'table-cell',
            width: '35px',
            height: '35px',

            minWidth: '35px',
            minHeight: '35px',
            backgroundColor: '#000',
        }
    }},
    methods: {
        useTool(pixel, ignoreSrc) {
            if(!ignoreSrc) {
                pixel = pixel.target;
            }
            
            switch(this.workspace.tool) {
                case 'pen':
                    pixel.style.backgroundColor = this.workspace.colour;
                    break;
                case 'eraser':
                    pixel.style.backgroundColor = '#000';
                    break;
                case 'eyedropper':
                    // this.$parent.workspace.colour = rgbtohex(pixel.style.backgroundColor);
                    this.$root.$emit('customColourChange', rgbtohex(pixel.style.backgroundColor));
                    break;
            }
        },
        dragDraw(pixel) {
            if(this.workspace.drawing) {
                this.useTool(pixel);
            }
        },
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
