<template>
    <div class="grid">
        <div class="row" v-for="row in sizey" :key="row">
            <div
                :style="style" 

                v-for="index in sizex" 
                :key="index" 
                
                class="e" 
                draggable=false 
                
                :data-row="row" 
                :data-index="index">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'grid',
    props: ['sizex', 'sizey'],
    data() {return {
        style: {
            display: 'table-cell',
            width: '35px',
            height: '35px',

            minWidth: '35px',
            minHeight: '35px',
            backgroundColor: '#000',
        }
    }}

}
</script>

<style scoped>
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
</style>
