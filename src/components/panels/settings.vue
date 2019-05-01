<template>
    <modal v-if="shown" @close="shown = false">
        <h3 style="border-bottom: 2px solid #202225; padding-bottom: 5px;" slot="header">Settings</h3>
        <div slot="body">
            <div v-if="!localStorageEnabled" class="alert warn">
                <b>Warning!</b>
                <span>LocalStorage is not supported on your browser, saving of settings isn't supported.</span>
            </div>
            <span class="subHeading">Pixel Size (px)</span>
            <input type="number" @change="updateSettings()" v-model="root.settings.gridPixelSize">
            
            <span class="subHeading" style="margin-top: 20px;">Change to pen tool on colour change</span>
            <label class="switch" for="cocc">
                <input type="checkbox" @change="updateSettings()" id="cocc" v-model="root.settings.changeOnColourChange" />
                <div class="slider round"></div>
            </label>
        </div>
    </modal>
</template>

<script>
export default {
    name: 'settingspanel',
    data: () => {return{
        shown: false,
        root: null,
        localStorageEnabled: true
    }},
    methods: {
        toggleState() {
            this.shown = !this.shown;
        },
        updateSettings() {
            localStorage.setItem('previousLoad', true);
            localStorage.setItem('gridPixelSize', this.root.settings.gridPixelSize);
            localStorage.setItem('changeOnColourChange', this.root.settings.changeOnColourChange);
        },
        loadSettings() {
            if(!localStorage.getItem('previousLoad')) this.updateSettings();
            this.root.settings.changeOnColourChange = this.strToBool(localStorage.getItem('changeOnColourChange'));
            this.root.settings.gridPixelSize = parseInt(localStorage.getItem('gridPixelSize'));
        },
        strToBool(str) {
            return str === 'true';
        }
    },
    mounted() {
        this.root = this.$root.$children[0];
        this.root.$on('toggleSettingsPanel', this.toggleState);

        if(typeof(Storage) === "undefined") this.localStorageEnabled = false;
        else this.loadSettings();
        this.localStorageEnabled = true;


    }
}
</script>

<style scoped>
.alert {
    padding: 1rem 1.5rem;
    margin-bottom: 20px;
    border-radius: 5px;
}
.alert span {
    display: block; 
    margin-top: 5px;
}
.alert.warn {
    background: #ffa500;
    color: #fff;
}
</style>