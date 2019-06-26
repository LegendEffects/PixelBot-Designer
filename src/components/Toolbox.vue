<template>
    <div class="toolbox" :class="'mounted-'+mounted">
        <div class="tools">
            <div v-for="tool of tools" :key="tool.ID"

                class="tool" 
                :class="{'active': isSelected(tool.name)}"

                @click="select(tool.name)"
                :title="tool.hover"
            >
                <font-awesome-icon class="icon" :icon="tool.icon"></font-awesome-icon>
            </div>

            <colour-switcher class="tool" @colourChange="updateWorkspace"></colour-switcher>

            <div class="end">
                <div class="tool" title="Animation Timeline" @click="toggleTimeline" :class="{'active': animationTimeline}"><font-awesome-icon class="icon" icon="layer-group"></font-awesome-icon></div>
                <router-link to="/settings" class="tool" title="Settings"><font-awesome-icon class="icon" icon="cog"></font-awesome-icon></router-link>
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
                hover: 'Pen (b)',
                bind: 'b',
            },
            {
                name: 'eraser',
                icon: 'eraser',
                hover: 'Eraser (e)',
                bind: 'e'
            },
            {
                name: 'eyedropper',
                icon: 'eye-dropper',
                hover: 'Eye dropper (i)',
                bind: 'i',
            },
            {
                name: 'fill',
                icon: 'fill',
                hover: 'Fill Bucket (g)',
                bind: 'g',
            }
        ],
        selectedTool: 'pen',
        colour: null,

        animationTimeline: false,
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
                timeline: this.animationTimeline,
                colour,
            });
        },
        toggleTimeline() {
            this.animationTimeline = !this.animationTimeline;
            this.updateWorkspace(this.colour);
        }
    },
    created() {
        for(const tool of this.tools) {
            if(tool.bind) {
                this.$root.registerKeybind(tool.bind, function() {
                    this.select(tool.name);
                }.bind(this));
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .toolbox {
        background: #202225;
        display: flex;
    }
    .toolbox .tools {
        display: flex;
        padding: .5rem;
    }

    .toolbox.mounted-top, .toolbox.toolbox.mounted-bottom {
        flex-direction: column;
    }
    .toolbox.mounted-left, .toolbox.mounted-right {
        flex-direction: row;
    }

    .toolbox.toolbox.mounted-left .tools, .toolbox.mounted-right .tools {
        flex-direction: column;
        height: calc(100vh - 1rem);
    }

    .toolbox.mounted-top .tools, .toolbox.mounted-bottom .tools {
        flex-direction: row;
        width: calc(100vw - 1rem);
    }

    .toolbox.mounted-right {
        margin-left: auto;
    }
    .toolbox.mounted-bottom {
        justify-content: flex-end;
        margin-top: auto;
    }

    .toolbox.mounted-left .tools .end, .toolbox.mounted-right .tools .end {
        margin-top: auto;
    }
    .toolbox.mounted-top .tools .end, .toolbox.mounted-bottom .tools .end {
        margin-left: auto;
        display: flex;
        flex-direction: row;
    }

    .toolbox.mounted-left .tools .tool, toolbox.mounted-right .tools .tool {
        margin-bottom: 15px;
    }

    .toolbox.mounted-top .tools .tool, toolbox.mounted-bottom .tools .tool {
        margin-right: 15px;
    }

    .tool {
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
