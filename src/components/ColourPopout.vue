<template>
    <div class="popout">
        <div class="colourList">
            <div class="title">Changing colour for: {{changing}}</div>
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
    props: ['changing']
}
</script>

<style scoped>
    .popout {
        position: absolute;

        border-radius: 1rem;
        background: #202225;
        color: #fff;
    }
    .popout .title {
        display: block;
        width: 100%;
        margin-bottom: 10px;
    }

    .popout .colourList {
        padding: 1rem;
        width: 273px;

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
