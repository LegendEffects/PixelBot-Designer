<template>
    <modal @close="$emit('close')">
        <template slot="header">Import</template>
        <template slot="body">
            <div class="alert-danger" v-show="error !== null">{{error}}</div>
            <textarea class="inputArea" v-model="importText"></textarea>
            <button class="submit" @click="processImport">Import</button>
        </template>
    </modal>
</template>

<script>
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

function convertFromSerpentine(string) {
    let decoded = decodeRLE(string);
    let array = [];

    for(let row of this.$root.pixelMap) {
        let fRow = [];
        for(let column of row) {
            fRow.push(this.$root.palette[decoded[column-1]]);
        }
        array.push(fRow);
    }
}

export default {
    components: {
        Modal
    },
    mixins: [Logging],
    data() {return{
        importText: "",
        error: null,
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
                // All 4 but compressed
                this.log('Import', "Detected all 4 (Compressed)");
            } else if(text.match(/pb(1|2|3|4)d/)){ // REGEX
                // Singular
                this.log('Import', "Detected singular");
                
                this.$store.state.workspace.grids[parseInt(text.substr(2, 1))-1].import(this.convertFromSerpentine(text.split('.')[1]));

            } else {
                this.error = "Invalid command.";
                error =true;
                this.log('Import', "Invalid command", 'error');
            }

            if(!error) {
                this.log('Import', 'Imported Successfully!');
            }
        },
        convertSerpentine(string) {
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
</style>
