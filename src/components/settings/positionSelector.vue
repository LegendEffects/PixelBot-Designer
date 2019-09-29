<template>
    <div class="positionSelector">
        <img src="../../assets/docks/top.png"
            :class="{'active': selected == 'top'}"
            @click="changeActive('top')">

        <img src="../../assets/docks/bottom.png"
            :class="{'active': selected == 'bottom'}"
            @click="changeActive('bottom')">

        <img src="../../assets/docks/left.png"
            :class="{'active': selected == 'left'}"
            @click="changeActive('left')">

        <img src="../../assets/docks/right.png"
            :class="{'active': selected == 'right'}"
            @click="changeActive('right')">
    </div>  
</template>

<script>
export default {
    name: 'positionSelector',
    props: ['value'],
    data: () => {return {
        selected: null,
    }},
    methods: {
        changeActive(newVal) {
            this.selected = newVal;
            this.$emit('input', this.selected);
        },
    },
    created() {
        this.selected = this.value;
    }
}
</script>

<style scoped lang="scss">
    .positionSelector {
        img {
            height: 50px;
            margin-right: 10px;
        }
        img:hover {
            cursor: pointer;
        }
        img.active {
            background: #ffcd00;
        }
    }
</style>
