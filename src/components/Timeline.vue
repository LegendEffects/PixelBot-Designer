<template>
    <div class="timeline">
        <div class="frames">
            <div class="frame">
                <div class="header">
                    1
                    <div class="end"><font-awesome-icon icon="times-circle" /></div>
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
    methods: {
        update() {
            this.$forceUpdate();
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
    }

    .frame {
        display: flex;
        flex-direction: column;
        background: #202225;
        width: 128px;
        padding: .5rem;
        border-radius: .25rem;

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
        .preview {
            background: #2e3035;
        }
    }

    .gridRow {
        display: flex;
        flex-direction: row;
    }

</style>
