<template>
    <div class="mounts">
        <portal-target name="left"></portal-target>
        <div class="centred">
            <portal-target name="top"></portal-target>
            
            <slot></slot>

            <portal-target name="bottom" class="side bottom"></portal-target>
        </div>
        <portal-target name="right"></portal-target>
    </div>
</template>

<script>
export default {
    name: 'MountingPoints',
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
