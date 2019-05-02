<template>
    <div id="palette">
        <div v-for="(name, swatch) in root.pixelColours" :key="swatch" class="colour" :class="swatch + checkActive(swatch)" v-on:click="makeActive(swatch)"></div>
    </div>
</template>

<script>
export default {
    data: () => {return {
        root: null,
    }},
    methods: {
        checkActive(swatchName) {
            if(this.root.tool.colour === swatchName) return ' active';
            else return '';
        },
        makeActive(swatchName) {
            this.root.tool.colour = swatchName;
            if(this.root.settings.changeOnColourChange && this.root.tool.selected === 'eraser') this.root.tool.selected = 'pen';
        }
    },
    beforeMount() {
        this.root = this.$root.$children[0];
    }
}
</script>

<style scoped>
    .colour {
        display: inline-block;

        width: 50px;
        height: 50px;
        margin-right: 5px;
    }
    .colour:nth-child(3n+3) {
        margin-right: 0;
    }
    .colour:hover {
        cursor: pointer;
    }
    .active {
        width: 46px;
        height: 46px;
    }
</style>