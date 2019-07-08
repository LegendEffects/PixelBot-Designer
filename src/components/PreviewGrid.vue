<template>
    <div class="grid">
        <div class="row" v-for="row in grid" :key="row.ID">
            <div 
                class="pixel" 
                v-for="pixel in row" 
                :key="pixel.ID" 
                :style="{backgroundColor: pixel}"
                draggable="false"
                @dragstart.prevent>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: ['grid'],
}
</script>

<style scoped lang="scss">
.grid {
    display: table;
    border-spacing: 1px;
    background: #37393f;
    border:1px solid #37393f;
    overflow: auto;
}
.row {
    display: table-row;
}
.pixel {
    display: table-cell;
    width: 4px;
    height: 4px;

    min-width: 4px;
    min-height: 4px;
    background-color: #000;
}
</style>
