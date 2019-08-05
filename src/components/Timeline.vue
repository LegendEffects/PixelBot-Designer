<template>
    <div class="timeline" :class="{'sideways': isSideways}">
        <div class="animationControl">
            <div class="left">
                Delay: <input v-model="$store.state.workspace.animationDelay" type="number"> ms
            </div>
            <div class="right">
                <font-awesome-icon label="Paste" icon="paste" @click="pasteFrame" />
                <font-awesome-icon label="Copy" icon="copy" style="margin-right: 20px;" @click="copyFrame" />

                <font-awesome-icon label="Step Backward (1)" class="clickable" @click="controlPlayer('backward')" icon="step-backward"/>
                <font-awesome-icon label="Play (SPACE)" class="clickable" v-show="!playing" @click="controlPlayer('start')" icon="play" />
                <font-awesome-icon label="Stop (SPACE)" class="clickable" v-show="playing" @click="controlPlayer('stop')" icon="stop" />
                <font-awesome-icon label="Step Forward (2)" class="clickable" @click="controlPlayer('forward')" icon="step-forward"/>
            </div>
        </div>
        <div class="frames">
            <div v-for="(frame, id) of $store.state.workspace.frames" :key="id" class="frame" :class="{'selected': $store.state.workspace.currentFrame == id}">
                <div class="header">
                    <span @click="$root.$emit('frameSwitch', id)" class="clickable">{{id+1}}</span>
                    <div @click="deleteFrame(frame.ID)" style="margin-left: auto;" class="clickable"><font-awesome-icon icon="trash" /></div>
                </div>
                <div @click="$root.$emit('frameSwitch', id)" class="preview clickable">
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
        player: null,
        playing: false,
    }},
    computed: {
        isSideways() {
            let state = this.$store.state.settings.layout.timeline;
            return state === 'bottom' || state === 'top';
        }
    },
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
        },


        playerTick() {
            let totalFrames = this.$store.state.workspace.frames.length;
            let currentFrame = this.$store.state.workspace.currentFrame;

            if(currentFrame+1 > totalFrames-1) {
                this.$root.$emit('frameSwitch', 0);
                return;
            }
            this.$root.$emit('frameSwitch', currentFrame+1);
        },
        controlPlayer(state) {
            switch(state) {
                case 'start':
                    this.player = setInterval(this.playerTick, this.$store.state.workspace.animationDelay);
                    this.playing = true;
                    break;
                case 'stop':
                    clearInterval(this.player);
                    this.playing = false;
                    break;
                case 'backward':
                    if(this.$store.state.workspace.currentFrame-1 < 0) {
                        this.$root.$emit('frameSwitch', this.$store.state.workspace.frames.length-1);
                    } else {
                        this.$root.$emit('frameSwitch', this.$store.state.workspace.currentFrame-1);
                    }
                    break;
                case 'forward':
                    if(this.$store.state.workspace.currentFrame+1 > this.$store.state.workspace.frames.length-1) {
                        this.$root.$emit('frameSwitch', 0);
                    } else {
                        this.$root.$emit('frameSwitch', this.$store.state.workspace.currentFrame+1);
                    }
                    break;
            }
        },
        copyFrame() {
            this.$store.state.settings.clipboard = this.$store.state.workspace.frames[this.$store.state.workspace.currentFrame];
        },
        pasteFrame() {
            let clipboard = this.$store.state.settings.clipboard;
            if(clipboard === null || clipboard === undefined) return;

            for(let i=0;i<clipboard.length;i++) {
                this.$store.state.workspace.grids[i].import(clipboard[i]);
            }
        }
    },
    created() {
        this.$root.$on('gridUpdated', this.update);

        this.$root.registerKeybind(' ', function() {
            if(this.playing) {
                this.controlPlayer('stop');
            } else {
                this.controlPlayer('start');
            }
        }.bind(this));
        this.$root.registerKeybind('1', function() {
            this.controlPlayer('backward');
        }.bind(this));
        this.$root.registerKeybind('2', function() {
            this.controlPlayer('forward');
        }.bind(this));
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
        flex-direction: column;
    }

    .frames {
        display: flex;
        flex-direction: column;
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

            margin-top: auto;
            margin-bottom: auto;
        }
    }
    .frame.selected {
        background: #ffcd00;
        .header {
            color: #000
        }
    }
    .timeline.sideways {
        flex-direction: column;
        .frames {
            flex-direction: row;

            .frame {
                margin-right: 10px;
            }
        }
        .animationControl {
            flex-direction: row;
        }
    }

    .gridRow {
        display: flex;
        flex-direction: row;
    }
    .animationControl {
        background-color: #1f2024;
        padding: .5rem 1rem;
        color: #fff;

        display: flex;
        flex-direction: column;

        .right {
            justify-content: flex-end;
            margin-left: auto;
            
            svg {
                margin-left: 10px;
            }
        }
    }
    // .animationControl .right svg:not(:nth-child(4)) {
    //     margin-right: 10px;
    // }

</style>
