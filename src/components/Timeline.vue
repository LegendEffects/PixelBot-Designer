<template>
    <div class="timeline">
        <div class="frames">
            <div class="frame" @click="select(1)" :class="{'selected': selected == 1}">
                <div class="header">
                    1
                </div>
                <div class="preview">
                    <div class="gridRow">
                        <preview :grid="$store.state.workspace.grids[0].export()" />
                        <preview :grid="$store.state.workspace.grids[1].export()" />
                    </div>
                    <div class="gridRow">
                        <preview :grid="$store.state.workspace.grids[2].export()" />
                        <preview :grid="$store.state.workspace.grids[3].export()" />
                    </div>
                </div>
            </div>
            <div class="frame">
                <div class="preview addFrame"><font-awesome-icon icon="plus" /></div>
            </div>
        </div>
    </div>
</template>

<script>

import Preview from './PreviewGrid'
import { setInterval } from 'timers';
export default {
    name: 'timeline',
    components: {
        Preview,
    },
    data() {return {
        selected: null,
    }},
    methods: {
        update() {
            this.$forceUpdate();
        },
        select(frame) {
            if(this.selected === frame) {
                this.selected = null;
            } else {
                this.selected = frame;
            }
        }
    },
    created() {
        this.$root.$on('gridUpdated', this.update);
    }
    
}
</script>

<style scoped lang="scss">
    .timeline {
        background: #25272b;
        height: 100%;

        display: flex;
        flex-direction: row;
    }

    .frames {
        padding: 10px;
        overflow: auto;
    }

    .frame {
        display: flex;
        flex-direction: column;
        background: #202225;
        width: 128px;
        padding: .5rem;
        border-radius: .25rem;
        margin-bottom: 10px;
        cursor: pointer;

        .header {
            display: flex;
            flex-direction: row;
            color: #fff;
            margin-bottom: 5px;

            .end {
                justify-content: end;
                margin-left: auto;
            }
        }

        .addFrame {
            font-size: 2rem;
            color: #fff;
            text-align: center;
        }
    }
    .frame.selected {
        background: #ffcd00;
        .header {
            color: #000
        }
    }

    .gridRow {
        display: flex;
        flex-direction: row;
    }

</style>
