<template>
    <div class="timeline">
        <div class="frames">
            <div v-for="(frame, id) of $store.state.workspace.frames" :key="id" class="frame" :class="{'selected': $store.state.workspace.currentFrame == id}">
                <div class="header">
                    <span @click="$root.$emit('frameSwitch', id)">{{id+1}}</span>
                    <div @click="deleteFrame(frame.ID)" style="margin-left: auto;" class="clickable"><font-awesome-icon icon="trash" /></div>
                </div>
                <div @click="$root.$emit('frameSwitch', id)" class="preview">
                    <div class="gridRow">
                        <preview :grid="frame[0]" />
                        <preview :grid="frame[1]" />
                    </div>
                    <div class="gridRow">
                        <preview :grid="frame[2]" />
                        <preview :grid="frame[3]" />
                    </div>
                </div>
            </div>
            <div class="frame clickable">
                <div class="preview addFrame" @click="addFrame"><font-awesome-icon icon="plus" /></div>
            </div>
        </div>
    </div>
</template>

<script>

import Preview from './PreviewGrid'
import logging from '../logging';
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
        },
        deleteFrame(id) {
            if(this.$store.state.workspace.frames.length === 1) {
                logging.log('Timeline', "You can't delete your only frame!", 'error');
                return false;
            }

            this.$store.state.workspace.frames.splice(id, 1);
        },
        addFrame() {
            this.$store.state.workspace.frames.push(JSON.parse(JSON.stringify(this.$store.state.workspace.blankFrame)));
            this.update();
        }
    },
    created() {
        this.$root.$on('gridUpdated', this.update);
    }
    
}
</script>

<style scoped lang="scss">
    .clickable {
        cursor: pointer;
    }
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
