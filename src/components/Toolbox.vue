<template>
    <div class="toolbox" :class="'mounted-'+mounted">
        <div class="tools">
            <colour-switcher></colour-switcher>
        </div>
    </div>

</template>

<script>
import ColourSwitcher from './toolbox/ColourSwitcher.vue';

export default {
    name: 'toolbox',
    props: ['mounted'],
    components: {
        ColourSwitcher,
    }
}
</script>

<style scoped lang="scss">
    .toolbox {
        display: flex;

        height: 100vh;
        background: #202225;
    }
    .toolbox .tools {
        padding: 1rem;
    }

    .toolbox.mounted-left {
        margin-right: auto;
        margin-left: 0;
    }
    .toolbox.mounted-right {
        margin-left: auto;
        margin-right: 0;
    }
</style>
