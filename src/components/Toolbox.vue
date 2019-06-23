<template>
    <div class="toolbox" :class="'mounted-'+mounted">
        <div class="tools">
            <div class="tool active">
                <font-awesome-icon class="icon" icon="pen"></font-awesome-icon>
            </div>
            <div class="tool">
                <font-awesome-icon class="icon" icon="eraser"></font-awesome-icon>
            </div>
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
        margin-left: 0;
    }
    .toolbox.mounted-right {
        margin-left: auto;
        margin-right: 0;
    }


    .tool {
        margin-bottom: 15px;

        border-radius: .5rem;

        width: 45px;
        height: 45px;
    }
    .tool.active {
        background-color: #2f3136;
    }
    .tool .icon {
        padding: .5rem;
        font-size: calc(45px - 1rem);

        color: #d6d6d6;
    }
    .tool.active .icon {
        color: #fff;
    }

    .tool:hover {
        cursor: pointer;
    }
</style>
