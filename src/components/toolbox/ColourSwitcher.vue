<template>
    <div class="switcher">
        <div class="foreground colour active" :style="{backgroundColor: colours.foreground}" @click="showColourSelector"></div>
        <div class="background colour" :style="{backgroundColor: colours.background}" @click="showColourSelector"></div>
        <div class="swapColours" title="Swap Colours (x)" @click="switchColours">
            <font-awesome-icon icon="level-down-alt"></font-awesome-icon>
        </div>
        <colour-popout v-show="popout.show" @selectColour="changeColour" :changing="popout.switching"></colour-popout>
    </div>
</template>

<script>
import ColourPopout from '../ColourPopout.vue';

export default {
    name: 'ColourSwitcher',
    components: {
        ColourPopout,
    },
    data: () => {return{
        displayOptions: {
            size: 45
        },
        colours: {
            foreground: '#fff',
            background: '#000',
        },
        popout: {
            show: false,
            switching: null,
        }
    }},
    created() {
        this.$root.registerKeybind('x', this.switchColours);
        this.$emit('colourChange', this.colours.foreground);
    },
    methods: {
        switchColours() {
            const cache = this.colours.foreground;
            this.colours.foreground = this.colours.background;
            this.colours.background = cache;
        },
        showColourSelector(event) {
            let type = event.target.classList[0];
            if(type !== 'background' && type !== 'foreground') return;
            else {
                if(type != this.popout.switching) {
                    this.popout.switching = type;
                    this.popout.show = true;
                } else {
                    this.popout.switching = null;
                    this.popout.show = false;
                }
            }
        },
        changeColour(event) {
            this.colours[this.popout.switching] = event.colour;
            this.$emit('colourChange', this.colours.foreground);
        }
    }
}
</script>

<style scoped>
    .switcher .colour:hover {
        cursor: pointer;
    }
    .switcher .colour {
        min-width: 30px;
        min-height: 30px;
        width: 30px;
        height: 30px;
        display: block;
    }
    .switcher .foreground {
        position: relative;
        z-index: 5;
    }
    .switcher .background {
        position: relative;
        z-index: 4;
        margin-top: -15px;
        margin-left: 15px;
    }
    .switcher .swapColours {
        position: absolute;
        font-size: 12px;
        margin-left: 35px;
        margin-top: -45px;
        color: #d6d6d6;
    }
    .switcher .swapColours:hover {
        cursor: pointer;
    }
</style>
