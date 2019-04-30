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