<template>
    <div class="mounts">
        <portal-target v-for="point of points" :key="point.ID" :name="point+'-left'"></portal-target>
        <div class="centred">
            <portal-target v-for="point of points" :key="point.ID" :name="point+'-top'"></portal-target>
            
            <slot></slot>

            <portal-target v-for="point of points" :key="point.ID" :name="point+'-bottom'"></portal-target>
        </div>
        <portal-target v-for="point of points" :key="point.ID" :name="point+'-right'"></portal-target>
    </div>
</template>

<script>
export default {
    name: 'MountingPoints',
    data() {return{
        points: ['toolbox', 'timeline']
    }},
    mounted() {
        this.$store.state.workspace.grids = this.$children.filter(function(val) {
            if(val.$el.className == 'grid') return true;
            else return false;
        });
        this.$root.$emit('gridsRegistered');
    }
}
</script>

<style scoped lang="scss">
    .mounts {
        display: flex;
        flex-direction: row;
        width: 100%;
        
        .centred {
            display: flex;
            flex-direction: column; 
            width: 100%; 
            height: 100%;
        }
        .side.bottom {
            margin-top: auto;
        }
    }
</style>
