<template>
    <modal @close="$emit('close')">
        <template slot="header">Export</template>
        <template slot="body">
            <select v-model="screen">
                <option value="singular">Singular</option>
                <option value="animation">Animation</option>
            </select>
            <div v-show="screen === 'singular'">
                <div class="alert-danger" v-show="error !== null">{{error}}</div>
                <div class="copyModule" style="margin-bottom: 20px; margin-top: 10px">
                    <img height="100%" width="32px" src="../../assets/grid/all.png">
                    <p class="copyArea">!pbd.{{getAllGrids().join('.')}}</p>
                    <button class="copyButton" v-clipboard:copy="'!pba.'+getAllGrids().join('.')"><font-awesome-icon icon="copy" /></button>
                </div>
                <div v-for="(grid, index) of getAllGrids()" :key="index" class="block">
                    <div class="copyModule">
                        <img height="100%" width="32px" src="../../assets/grid/singular.png" :style="'transform: rotate('+getRotateAmount(index)+'deg)'">
                        <p class="copyArea">!pb{{index+1}}d.{{grid}}</p>
                        <button class="copyButton" :class="{'overLimit': grid.length>500}" v-clipboard:copy="'!pb'+(index+1)+'d.'+grid"><font-awesome-icon icon="copy" /></button>
                    </div>
                </div>
            </div>
            <div v-show="screen === 'animation'">
                <div class="copyModule" style="margin-bottom: 20px; margin-top: 10px">
                    <img height="100%" width="32px" src="../../assets/grid/all.png">
                    <p class="copyArea">!pbaz.{{toGZip($store.state.workspace.animationDelay+'.'+getAllAnimatedGrids().join('.'))}}</p>
                    <button class="copyButton" v-clipboard:copy="'!pbaz.'+toGZip($store.state.workspace.animationDelay+'.'+getAllAnimatedGrids().join('.'))"><font-awesome-icon icon="copy" /></button>
                </div>
                <div v-for="(grid, index) of getAllAnimatedGrids()" :key="index" class="block">
                    <div class="copyModule">
                        <img height="100%" width="32px" src="../../assets/grid/singular.png" :style="'transform: rotate('+getRotateAmount(index)+'deg)'">
                        <p class="copyArea">!pb{{index+1}}a.{{$store.state.workspace.animationDelay}}.{{grid}}</p>
                        <button class="copyButton" :class="{'overLimit': grid.length>500}" v-clipboard:copy="'!pb'+(index+1)+'d.'+grid"><font-awesome-icon icon="copy" /></button>
                    </div>
                </div>
            </div>
        </template>
    </modal>
</template>

<script>
import Modal from '../Modal'
import Logging from '../../logging'
import Pako from 'pako'

function encodeRLE(string) {
    let lastLetter = undefined;
    let currentCount = undefined;
    let output = '';
    for(let i=0;i<string.length;i++) {
        if(typeof lastLetter === 'undefined') {
            lastLetter = string[i];
            currentCount = 1;
            continue;
        }
        if(string[i] !== lastLetter) {
            output += currentCount+lastLetter;
            lastLetter = string[i];
            currentCount = 1;
            continue;
        }
        currentCount++;
    }
    return (output + (currentCount + lastLetter))
}
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

export default {
    components: {
        Modal
    },
    mixins: [Logging],
    data() {return{
        error: null,
        screen: 'singular'
    }},
    methods: {
        getAllGrids() {
            let final = []
            for(let i=1;i<this.$store.state.workspace.grids.length+1;i++) {
                let grid = this.getGrid(i);
                if(grid.length > 500) this.error = 'One or more of the grids are over the Twitch character limit and have been highlighted.';

                final.push(grid);
            }
            return final;
        },
        getAllAnimatedGrids() {
            //let final = [];
            // for(let i=1;i<this.$store.state.workspace.grids.length+1;i++) {
            //     let grid = this.getAnimationOfGrid(i);
            //     if(grid.length > 500) this.error = 'One or more of the grids are over the Twitch character limit and have been highlighted.';

            //     final.push(grid);
            // }
            // console.log("start")
            // for(let frame of this.$store.state.workspace.frames) {
            //     let grid = [];
            //     console.log("frame")
            //     for(let panel of frame) {
            //         console.log("panel");
            //         grid.push(this.convertToSerpentine(panel));
            //     }

            //     final.push(grid.join('.'))
            // }

            // //console.log(final);

            // console.log("final");
            // return final;


            let beforeStringFormat = [[],[],[],[]];
            for(let frame of this.$store.state.workspace.frames) {
                for (let g = 0; g < frame.length; g++) {
                    beforeStringFormat[g].push(this.convertToSerpentine(frame[g]));   
                }
            }

            let final = [];
            for(let toParse of beforeStringFormat) final.push(toParse.join("."));


            return final;
        },
        getGrid(gridId) {
            let exported = this.$store.state.workspace.grids[gridId-1].export();
            this.log('Export', 'Gotten Grid '+gridId);
            return this.convertToSerpentine(exported);
        },
        convertToSerpentine(array) {
            let string = [];

            let rowC = 0;
            for(let row of array) {
                for(let colC=0;colC<row.length;colC++) {
                    let pid = this.$root.pixelMap[rowC][colC];
                    string[pid] = getKeyByValue(this.$root.palette, array[rowC][colC]);
                }
                rowC++;
            }

            return encodeRLE(string.join(''));
        },
        getAnimationOfGrid(gridId) {
            let final = [];
            for(let frame of this.$store.state.workspace.frames) {
                final.push(this.convertToSerpentine(frame[gridId-1]));
            }

            return final.join('.');
        },
        toGZip(str) {
            return new Buffer(Pako.gzip(str)).toString('base64');
        },
        getRotateAmount(index) {
            switch(index) {
                case 0:
                    return 0;
                case 1:
                    return 90;
                case 2:
                    return 270
                case 3:
                    return 180;
            }
            return false;
        }
    }
}
</script>

<style scoped>
.alert-danger {
    background: rgb(211, 53, 53);
    color: #fff;
    padding: 1rem;
    border-radius: 0.25rem;
    margin-bottom: 2rem;
}

.block {
    display: block;
    margin-bottom: 10px;
}
.copyModule {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.copyArea {
    line-height: 1.5rem;

    width: 80%;
    overflow: auto;
    background: #37393f;
    border-radius: .25rem 0 0 .25rem;
    padding: 5px 10px;

    margin: 0;
}
.copyButton {
    width: 20%;
    background: #2e3035;
    color: #fff;
    font-size: 1rem;
    border-radius: 0 .25rem .25rem 0;
    padding: .5rem 1rem;
    border: none;
    outline: none;
    cursor: pointer;
}
.overLimit {
    background: rgb(211, 53, 53);
}
</style>
