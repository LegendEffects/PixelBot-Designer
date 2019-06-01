<template>
    <modal v-if="shown" @close="shown = false">
        <h3 style="border-bottom: 2px solid #202225; padding-bottom: 5px;" slot="header">Credits</h3>
        <p slot="body">
            Editor Developed by <a href="https://legendeffects.co.uk">LegendEffects</a><br><br>
            Original Editor by <a href="https://clawstudios.com">Claw Studios</a><br><br>
            Original PixelBot concept invented by <a href="https://laboratory424.com">Laboratory 424</a><br><br>
            First editor concept by <a href="https://www.twitch.tv/CaptainPDA">CaptainPDA</a>
        </p>
    </modal>
</template>

<script>
export default {
    name: 'creditspanel',
    data: () => {return{
        shown: false,
        root: null
    }},
    methods: {
        toggleState() {
            this.shown = !this.shown;
        }
    },
    mounted() {
        this.root = this.$root.$children[0];
        this.root.$on('toggleCreditsPanel', this.toggleState);
    }
}
</script>

<style scoped>
a {
    color: #fff;
}
a:visited {
    color: #fff;
}
</style>
