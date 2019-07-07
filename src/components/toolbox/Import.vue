<template>
    <modal @close="$emit('close')">
        <template slot="header">Import</template>
        <template slot="body">
            <textarea class="inputArea" v-model="importText"></textarea>
            <button class="submit" @click="processImport">Import</button>
        </template>
    </modal>
</template>

<script>
import Modal from '../Modal'
import Logging from '../../logging'
export default {
    components: {
        Modal
    },
    mixins: [Logging],
    data() {return{
        importText: "",
    }},
    methods: {
        processImport() {
            this.log('Import', this.importText);
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
</style>
