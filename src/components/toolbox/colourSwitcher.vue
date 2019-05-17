<template>
    <div class="colourSwitcher">
        <div class="foreground colour active" :class="root.tool.colour"></div>
        <div class="background colour" :class="root.tool.secondaryColour"></div>
        <div class="swapColours" @click="root.swapColours" title="Swap Colours (x)"><i class="fas fa-level-down-alt"></i></div>
    </div>
</template>

<script>
export default {
    name: 'colourswitcher',
    data() {return {
        root: null,
    }},
    beforeMount() {
        this.root = this.$root.$children[0];
    }
}
</script>

<style scoped>
    .colourSwitcher .colour {
        min-width: 30px;
        min-height: 30px;
        width: 30px;
        height: 30px;

        display: block;
    }
    .colourSwitcher .colour.active {
        min-width: 28px;
        min-height: 28px;
        width: 28px;
        height: 28px;
    }

    .colourSwitcher .foreground {
        position: relative;
        z-index: 5;
    }
    .colourSwitcher .background {
        position: relative;
        z-index: 4;

        margin-top: -15px;
        margin-left: 15px;
    }
    .colourSwitcher .swapColours {
        position: absolute;
        font-size: 12px;
        margin-left: 35px;
        margin-top: -45px;
        color: #d6d6d6;
    }

    .colourSwitcher .swapColours:hover {
        cursor: pointer;
    }
</style>
