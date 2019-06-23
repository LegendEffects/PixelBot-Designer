<template>
    <div class="popout">
        <div class="colourList">
            <div 
                class="swatch"
                v-for="(val, key) of $root.palette"
                :key="val.ID"
                
                :style="{backgroundColor: val}"
                :data-key="key"
                @click="$emit('selectColour', {'name': key, 'colour': val})"
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'colourpopout',
    props: ['colours']
}
</script>

<style scoped>
    .popout {
        position: absolute;
        top: 50px;
        right: 100px;

        border-radius: 1rem;
        background: #202225;
        color: #fff;
        text-align: right;
    }
    .popout .colourList {
        padding: 1rem;
        width: 300px;

        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }
    .popout .colourList .swatch {
        width: 35px;
        height: 35px;
        margin: 2px;
    }
    .popout .colourList .swatch:hover {
        cursor: pointer;
    }
</style>
