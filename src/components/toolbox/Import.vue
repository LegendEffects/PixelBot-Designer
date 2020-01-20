<template>
    <modal @close="$emit('close')">
        <template slot="header">Import</template>
        <template slot="body">
            <div class="alert-danger" v-show="error !== null">{{error}}</div>
            <div class="alert-success" v-show="success !== null">{{success}}</div>
            <textarea spellcheck="false" autocomplete="false" autofocus="true" class="inputArea" v-model="importText"></textarea>
            <button class="submit" @click="processImport">Import</button>
        </template>
    </modal>
</template>

<script>
import Pako from 'pako';

import Modal from '../Modal'
import Logging from '../../logging'

function decodeRLE(string) {
    return string.replace(/(\d+)([a-zA-A])/g, function (match, num, letter) {
        var ret = '', i;
        for (i = 0; i < parseInt(num, 10); i++) {
            ret += letter;
        }
        return ret;
    });
}
function chunk(arr, size) {
    return arr.reduce((chunks, el, i) => (i % size ? chunks[chunks.length - 1].push(el) : chunks.push([el])) && chunks, [])
}

export default {
    components: {
        Modal
    },
    mixins: [Logging],
    data() {return{
        importText: "",
        error: null,
        success: null,
    }},
    methods: {
        processImport() {
            this.log('Import', "Starting Import");
            let text = this.importText;
            let error = false;

            if(text[0] === '!') text = text.substr(1, text.length); // Remove prefix

            if(text.substr(0, 3) === 'pbd') {
                // All 4 together
                this.log('Import', "Detected all 4 (Uncompressed)");
                let parts = text.split('.');
                parts.shift();

                let onGrid = 0;
                for(let part of parts) {
                    this.$store.state.workspace.grids[onGrid].import(this.convertFromSerpentine(part));
                    onGrid++;
                }
            } else if(text.substr(0, 4) === 'pbaz') {
                // All 4 but compressed and animated
                this.log('Import', "Detected all 4 animated (Compressed)");
                let output = Pako.inflate(new Buffer(text.slice(5), 'base64'), {to: 'string'}).split('.');
                
                if((output.length-1)%4 !== 0) {
                    this.error = "Number of panels isn't divisible by 4.";
                    error = true;
                    this.log('Import', "Number of panels isn't divisible by 4.");
                }

                let frames = chunk(output.slice(1), 4);
                
                let currentFrame = 0;
                for(const frame of frames) {
                    let onGrid = 0;
                    for(const grid of frame) {
                        if(this.$store.state.workspace.frames[currentFrame] === undefined) {
                            this.$store.state.workspace.frames[currentFrame] = JSON.parse(JSON.stringify(this.$store.state.workspace.blankFrame));
                        }

                        this.$store.state.workspace.frames[currentFrame][onGrid] = this.convertFromSerpentine(grid);
                        onGrid++;
                    }
                    currentFrame++;
                }
                this.$root.$emit('frameSwitch', 0);
            } else if(text.match(/pb(1|2|3|4)d/)){ // REGEX
                // Singular
                this.log('Import', "Detected singular");
                
                this.$store.state.workspace.grids[parseInt(text.substr(2, 1))-1].import(this.convertFromSerpentine(text.split('.')[1]));
            } else if(text.match(/pb(1|2|3|4)a/)) {
                this.log('Import', "Detected singular animated");

                let frames = text.split('.');
                frames.splice(0, 2);

                for(let f=0; f < frames.length; f++) {
                    if(this.$store.state.workspace.frames[f] === undefined) this.$store.state.workspace.frames[f] = JSON.parse(JSON.stringify(this.$store.state.workspace.blankFrame));
                    this.$store.state.workspace.frames[f][parseInt(text.substr(2, 1))-1] = this.convertFromSerpentine(frames[f]);
                }

                this.$root.$emit('frameSwitch', 0);
            } else {
                this.error = "Invalid command.";
                error = true;
                this.log('Import', "Invalid command", 'error');
            }

            if(!error) {
                this.log('Import', 'Imported Successfully!');
                this.success = "Successfully Imported."
            }
        },
        convertFromSerpentine(string) {
            let array = [];
            let decoded = decodeRLE(string)
            for(let row of this.$root.pixelMap) {
                let fRow = [];
                for(let column of row) {
                    fRow.push(this.$root.palette[decoded[column-1]]);
                }
                array.push(fRow);
            }
            return array;
        }
    }
}
</script>

<style scoped>
.inputArea {
    min-width: 100%;
    max-width: 100%;
    min-height: 200px;
    background: #2f3136;
    color: #fff;

    border: none;
    outline: none;
}   
.submit {
    background: #2f3136;
    color: #fff;
    font-size: 1rem;

    border-radius: .25rem;
    padding: .5rem 1rem;

    border: none;
    outline: none;

    cursor: pointer;
}
.alert-danger {
    background: rgb(211, 53, 53);
    color: #fff;
    padding: 1rem;
    border-radius: 0.25rem;
    margin-bottom: 2rem;
}
.alert-success {
    background: rgb(39, 174, 96);
    color: #fff;
    padding: 1rem;
    border-radius: 0.25rem;
    margin-bottom: 2rem;
}
</style>
