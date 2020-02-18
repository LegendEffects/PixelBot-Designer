<template>
    <window-frame id="export_panel" :items="['Singular', 'Animation', 'Experimental']" :activeItem="activePanel" :maxWidth="350" @contextClick="parseClick" @close="$emit('close')">
        <template slot="body">
            <div v-if="error !== null" class="alert-danger">
                {{ error }}
            </div>

            <!-- Singular -->
            <div v-if="activePanel === 'Singular'" class="window-panel">
                <div class="copy-module" v-for="allGrids of [getAllGrids().join('.')]" :key="allGrids" style="margin-bottom: 1.5rem">
                    <img src="../../assets/grid/all.png">

                    <p class="copy-area">!pbd.{{allGrids}}</p>
                    <button class="copy-button" :class="isOversized(allGrids, 5)" v-clipboard:copy="'!pbd.'+allGrids">
                        <font-awesome-icon icon="copy" />
                        </button>
                </div>

                <div class="copy-module" v-for="(grid, index) of getAllGrids()" :key="index">
                    <img src="../../assets/grid/singular.png" :style="'transform: rotate('+getRotateAmount(index)+'deg)'">
                    <p class="copy-area">!pb{{ index + 1 }}d.{{grid}}</p>
                    <button class="copy-button" :class="isOversized(grid, 5)" v-clipboard:copy="'!pb'+(index + 1)+'d.'+grid">
                        <font-awesome-icon icon="copy" />
                    </button>
                </div>
            </div>

            <!-- Animated -->
            <div v-else-if="activePanel === 'Animation'" class="window-panel">
                <div class="copy-module" v-for="allAnimatedGrids of [toGZip($store.state.workspace.animationDelay+'.'+getAllAnimatedGrids().join('.'))]" :key="allAnimatedGrids" style="margin-bottom: 1.5rem">
                    <img src="../../assets/grid/all.png">
                    
                    <p class="copy-area">!pbaz.{{ allAnimatedGrids }}</p>
                    <button class="copy-button" :class="isOversized(allAnimatedGrids, 6)" v-clipboard:copy="'!pbaz.' + allAnimatedGrids">
                        <font-awesome-icon icon="copy" />
                    </button>
                </div>

                <div class="copy-module" v-for="(grid, index) of getAllSingularAnimatedGrids()" :key="index">
                    <img src="../../assets/grid/singular.png" :style="'transform: rotate('+getRotateAmount(index)+'deg)'">

                    <p class="copy-area">!pb{{ index + 1 }}a.{{ $store.state.workspace.animationDelay }}.{{ grid }}</p>
                    <button class="copy-button" :class="isOversized(grid, $store.state.workspace.animationDelay.toString().length + 7)">
                        <font-awesome-icon icon="copy" />
                    </button>
                </div>
            </div>

            <!-- Expermimental (Custom Palette) -->
            <div v-else-if="activePanel === 'Experimental'" class="window-panel">
                <div class="copy-module" v-for="allGrids of [getAllGridsWithPalette(), toGZip(getAllGridsWithPalette())]" :key="allGrids">
                    <img src="../../assets/grid/all.png">

                    <p class="copy-area">!pbdhz.{{ allGrids }}</p>
                    <button class="copy-button" :class="isOversized(allGrids, 7)" v-clipboard:copy="'!pbdhz.' + allGrids">
                        <font-awesome-icon icon="copy" />
                    </button>
                </div>
            </div>

        </template>
    </window-frame>
</template>

<script>
import WindowFrame from "../Framework/WindowFrame.vue";

// import Modal from '../Modal'
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
        WindowFrame
    },
    mixins: [Logging],
    data() {return{
        error: null,
        activePanel: 'Singular'
    }},
    methods: {
        parseClick(event) {
            this.activePanel = event;
        },
        isOversized(string, add) {
            if(string.length + add > 500) {
                this.error = "One or more of the grids are over the Twitch character limit and have been highlighted.";
                return {
                    oversized: true
                }
            } else {
                return {
                    oversized: false
                }
            }
        },
        getAllGridsWithPalette() {
            let colours = [];
            for(const colourId in this.$store.state.workspace.palette) {
                colours.push(colourId+this.$store.state.workspace.palette[colourId]);
            }

            return colours.join(',') + "." + this.getAllGrids().join(".");
        },

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
            let final = [];

            for(let frame of this.$store.state.workspace.frames) {
                let grids = [];

                for(let g = 0; g < frame.length; g++) {
                    grids.push(this.convertToSerpentine(frame[g]));
                }

                final.push(grids.join("."));
            }

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

                    string[pid] = this.getColorMapping(array[rowC][colC]);
                }
                rowC++;
            }

            return encodeRLE(string.join(''));
        },
        getAllSingularAnimatedGrids() {
            let final = [];
            for(let i=0; i < this.$store.state.workspace.grids.length; i++) {
                final.push(this.getAnimationOfGrid(i+1));
            }

            return final;
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
        },
        getColorMapping(key) {
            const firstAttempt = getKeyByValue(this.$root.palette, key);
            if(firstAttempt !== undefined) return firstAttempt;

            const secondAttempt = getKeyByValue(this.$store.state.workspace.palette, key);
            if(secondAttempt !== undefined) return secondAttempt;

            this.log('Error', 'Unable to find the colour mapping for: '+key);
        },

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
.alert-danger {
    background: rgb(211, 53, 53);
    color: #fff;
    padding: .75rem .5rem;
}

.window-panel {
    padding: 1rem;
}

.copy-module {
    display: flex;
    flex-direction: row;
    
    img {
        width: 32px;
        height: 100%;
    }

    .copy-area {
        background: rgba(255, 255, 255, 0.05);
        color: white;
        padding: .5rem;

        width: 100%;
        overflow-x: scroll;

        margin: 0;
    }
    .copy-button {
        background: var(--main-bg-color);
        color: white;

        outline: none;
        border: none;
        
        padding: 0 1rem;
        cursor: pointer;

        &.oversized {
            background-color: red;
        }
    }
}

.copy-module:not(:last-of-type) {
    margin-bottom: .5rem;
}
</style>
