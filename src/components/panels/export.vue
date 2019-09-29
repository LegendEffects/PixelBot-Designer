<template>
    <modal v-if="shown" @close="shown = false">
        <h3 style="border-bottom: 2px solid #202225; padding-bottom: 5px;" slot="header">Export
            <select style="float: right;" v-model="tab">
                <option value="singleFrame">Single Frame</option>
                <option value="animation">Animation</option>
            </select>

        </h3>
        <div slot="body">
            <div v-if="tab === 'singleFrame'">
                <span>
                    <p style="overflow: auto; padding: 20px;">!pbd{{exportAll()}}</p>
                    <button class="actionButton darker" @click="copyCommand('!pbd'+exportAll())"><i class="fas fa-copy"></i></button>
                </span>
                <span v-for="(pixelbot, index) in data" :key="pixelbot.id">
                    <p style="overflow: auto; padding: 20px;">!pb{{index}}d.{{pixelbot}}</p>
                    <button class="actionButton darker" @click="copyCommand('!pb'+index+'d.'+pixelbot)"><i class="fas fa-copy"></i></button>
                </span>
            </div>
            <div v-else>
                <p style="overflow: auto; padding: 20px;">!pbaz.{{exportAllAnimations()}}</p>
                <button class="actionButton darker" @click="copyCommand('!pbaz.'+exportAllAnimations())"><i class="fas fa-copy"></i></button>
                <span v-for="(pixelbot, index) in animationexport" :key="pixelbot.id">
                    <p style="overflow: auto; padding: 20px;">!pb{{index}}a.{{root.animation.delay}}{{pixelbot}}</p>
                    <button class="actionButton darker" @click="copyCommand('!pb'+index+'a.'+root.animation.delay+pixelbot)"><i class="fas fa-copy"></i></button>
                </span>
            </div>
        </div>
    </modal>
</template>

<script>
const pako = require('pako');
export default {
    name: 'exportpanel',
    data: () => {return {
        shown: false,
        root: null,
        data: {},
        animationexport: {},
        tab: 'singleFrame',
    }},
    methods: {
        toggleState() {
            this.shown = !this.shown;
        },
        export() {
            this.exportAnimation();

            let final = {};
            let count = 0;

            for(let grid of this.root.grids) {
                count++;
                final[count] = grid.export();
            }

            this.data = final;
            this.toggleState();
        },
        exportAll() {
            let final = '';
            for(let grid of this.root.grids) {
                final += '.'+grid.export();
            }
            return final;
        },
        encodeToGzip(str) {
            let buff = new Buffer(pako.gzip(str));

            return buff.toString('base64');
        },
        exportAnimation() {
            let final = {};
            let count = 0;

            for(let grid of this.root.grids) {
                count++;
                final[count] = grid.exportAnimation();
            }

            this.animationexport = final;
        },
        exportAllAnimations() {
            let final = this.root.animation.delay;

            for(let i=0; i<this.root.grids[0].grid.length; i++) {
                for(let grid of this.root.grids) {
                    final += '.'+grid.export(i);
                }
            }

            return this.encodeToGzip(final);
        },
        copyCommand(text) {
            this.$copyText(text);
        },
    },
    mounted() {
        this.root = this.$root.$children[0];
        this.root.$on('toggleExportPanel', this.export);
    }
}
</script>