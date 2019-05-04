<template>
    <modal v-if="shown" @close="shown = false">
        <h3 style="border-bottom: 2px solid #202225; padding-bottom: 5px;" slot="header">Import <input style="float: right;" v-model="selectedGrid" type="number" min="1" max="4"></h3>
        <p slot="body">
            <textarea style="width: 100%; height: 200px" id="importArea" v-model="importText"></textarea>
            <button class="actionButton darker" @click="startImport"><i class="fas fa-upload"></i></button>
        </p>
    </modal>
</template>

<script>
const pako = require('pako');
export default {
    name: 'importpanel',
    data: () => {return{
        shown: false,
        importText: '',
        selectedGrid: null,
        root: null,
    }},
    methods: {
        startImport() {
            let allowedCommands = ['!pb1d.', '!pb2d.', '!pb3d.', '!pb4d.'];

            //4x4 import
            if(this.importText.substring(0,5) === '!pbd.') {
                let parts = this.importText.slice(5).split('.');
                if(parts < 1 || parts > 4) return;

                let count = 0;
                for(let part of parts) {
                    this.root.grids[count].import(part);
                    count++;
                }
            } else if(this.importText.substring(0,6) === '!pbaz.') {
                let buffer = new Buffer(this.importText.slice(6), 'base64');
                let output = pako.inflate(buffer, {to: 'string'}).split('.');

                let delay = output[1];
                output = output.slice(1);
                
                let count = 0;
                let grids = [[], [], [], []];
                for(let part of output) {
                    grids[count].push(part);

                    count++;
                    if(count === 4) count = 0;
                }

                count = 0;
                for(let iGrid of grids) {
                    let count2 = 0;
                    this.root.grids[count].grid = []
                    for(let iFrame of iGrid) {
                        let output = iFrame.replace(/(\d+)([a-zA-A])/g, function (match, num, letter) {
                            var ret = '', i;
                            for (i = 0; i < parseInt(num, 10); i++) {
                                ret += letter;
                            }
                            return ret;
                        });
                        
                        let cache = [];
                        for(let i=1;i<145;i++) {
                            if(output[i-1] in this.root.pixelColours) cache[i] = output[i-1];
                            else cache[i] = 'e';
                        }

                        this.root.grids[count].grid.push(cache);
                        count2++;
                    }
                    count++;
                }
                this.root.refreshAllGrids();

            } else if(allowedCommands.includes(this.importText.substring(0,6))) {
                let importString = this.importText.substring(6, this.importText.length);
                let smartDetect = this.importText.charAt(3);
                if(smartDetect < 1 || smartDetect > 4) return;

                if(this.selectedGrid !== '' || this.selectedGrid !== null) this.root.grids[selected-1].import(importString);
                else this.root.grids[smartDetect-1].import(importString);
            }
        },
        toggleState() {
            this.shown = !this.shown;
        }
    },
    mounted() {
        this.root = this.$root.$children[0];
        this.root.$on('toggleImportPanel', this.toggleState);
    }
}
</script>