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
                <span v-for="(pixelbot, index) in data" :key="pixelbot.id">
                    <p style="overflow: auto; padding: 20px;">!pb{{index}}d.{{pixelbot}}</p>
                    <button class="actionButton darker" @click="copyCommand('!pb'+index+'d.'+pixelbot)"><i class="fas fa-copy"></i></button>
                </span>
                <span>
                    <p style="overflow: auto; padding: 20px;">!pbd{{exportAll()}}</p>
                    <button class="actionButton darker" @click="copyCommand('!pbd'+exportAll())"><i class="fas fa-copy"></i></button>
                </span>
            </div>
            <div v-else>
                <span v-for="(pixelbot, index) in animationexport" :key="pixelbot.id">
                    <p style="overflow: auto; padding: 20px;">!pb{{index}}a.{{root.animation.delay}}{{pixelbot}}</p>
                </span>
            </div>
        </div>
    </modal>
</template>

<script>
export default {
    name: 'exportpanel',
    data: () => {return {
        shown: false,
        root: null,
        data: {},
        animationexport: {},
        tab: 'singleFrame',
        shutJahedUp: true,
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
        exportAnimation() {
            let final = {};
            let count = 0;

            for(let grid of this.root.grids) {
                count++;
                console.log(grid.exportAnimation());
                final[count] = grid.exportAnimation();
            }

            this.animationexport = final;
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