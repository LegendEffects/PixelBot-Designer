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
            let drawCommands = ['!pb1d.', '!pb2d.', '!pb3d.', '!pb4d.'];
            let animationCommands = ['!pb1a.', '!pb2a.', '!pb3a.', '!pb4a.'];

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
                        let output = this.decodeRle(iFrame);
                        
                        let cache = [];
                        for(let i=1;i<145;i++) { // Check for invalid colours during import, if it is invalid then make it black
                            if(output[i-1] in this.root.pixelColours) cache[i] = output[i-1];
                            else cache[i] = 'e';
                        }

                        this.root.grids[count].grid.push(cache);
                        count2++;
                    }
                    count++;
                }
                this.root.refreshAllGrids();

            } else if(drawCommands.includes(this.importText.substring(0,6))) {
                let importString = this.importText.substring(6, this.importText.length);
                let smartDetect = this.importText.charAt(3);
                if(smartDetect < 1 || smartDetect > 4) return;

                if(this.selectedGrid !== '' && this.selectedGrid !== null) this.root.grids[this.selectedGrid-1].import(importString);
                else this.root.grids[smartDetect-1].import(importString);
            } else if(animationCommands.includes(this.importText.substring(0, 6))) {
                // !pb1a.300.4e4c6e2d1e4m5e3m2e2m2d1e1d1e8m1d1e2d8m4d2m1e2m1e2m4d2e1d2e1d2e2d1e1d2m1e2m1e2m1d2e1d8m1d2e1d2e1m1e1m1e1m1e1d2e1d1e1m1e1m1e1m2e1d2e10d1e.4e4c6e2d3e2m5e2m1e2d1e1m2d1e1d1e3m2e3m1d1e2d8m4d2m1e2m1e2m4d2e1d2e1d2e2d1e1d2m1e2m1e2m1d2e1d8m1d2e1d2e1m1e1m1e1m1e1d2e1d1e1m1e1m1e1m2e1d2e10d1e
                
                let importString = this.importText.substring(6, this.importText.length);
                let smartDetect = this.importText.charAt(3);
                if(smartDetect < 1 || smartDetect > 4) return;

                let grid;
                if(this.selectedGrid !== '' && this.selectedGrid !== null) grid = this.root.grids[this.selectedGrid-1];
                else grid = this.root.grids[smartDetect-1];

                let frames = importString.split('.');

                let delay = parseInt(frames.shift());
                if(isNaN(delay)) return; // Bad formatting
                this.root.animation.delay = delay; // Set the delay from the import to the delay set

                let count = 0;
                for(let frame of frames) {
                    grid.import(frame, count);
                    count++;
                }
            }
        },
        decodeRle(string) {
            return string.replace(/(\d+)([a-zA-A])/g, function (match, num, letter) {
                var ret = '', i;
                for (i = 0; i < parseInt(num, 10); i++) {
                    ret += letter;
                }
                return ret;
            });
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