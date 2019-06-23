<template>
    <div class="toolbox" :class="'mounted-'+mounted">
        <div class="tools">
            <div v-for="tool of tools" :key="tool.ID"

            class="tool" 
            :class="{'active': isSelected(tool.name)}"

            @click="select(tool.name)"
            :title="tool.hover">
                <font-awesome-icon class="icon" :icon="tool.icon"></font-awesome-icon>
            </div>

            <colour-switcher @colourChange="updateWorkspace"></colour-switcher>

            <div class="end">
                <div class="tool"><font-awesome-icon class="icon" icon="cog"></font-awesome-icon></div>
            </div>
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
    },
    data: () => {return {
        tools: [
            {
                name: 'pen',
                icon: 'pen',
                hover: 'Pen (b)'
            },
            {
                name: 'eraser',
                icon: 'eraser',
                hover: 'Eraser (e)'
            },
            {
                name: 'fill',
                icon: 'fill',
                hover: 'Fill Bucket (g)'
            }
        ],
        selectedTool: 'pen',
        colour: null,
    }},
    methods: {
        select(tool) {
            this.selectedTool = tool;
            this.updateWorkspace(this.colour);
        },
        isSelected(tool) {
            return this.selectedTool == tool;
        },
        updateWorkspace(colour) {
            this.colour = colour;
            this.$emit('updateWorkspace', {
                tool: this.selectedTool,
                colour
            });
        }
    }
}
</script>

<style scoped lang="scss">
    .toolbox {
        height: 100vh;
        background: #202225;
    }
    .toolbox .tools {
        display: flex;
        flex-direction: column;

        height: calc(100vh - 2rem);
        padding: 1rem;
    }

    .toolbox.mounted-left {
        margin-left: 0;
    }
    .toolbox.mounted-right {
        margin-left: auto;
        margin-right: 0;
    }

    .toolbox .tools .end {
        margin-top: auto;
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
