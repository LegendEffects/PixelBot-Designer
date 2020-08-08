<template>
  <div class="mounts">
    <portal-target name="workspace-left" multiple />

    <div class="centered">
      <portal-target name="workspace-top" multiple />

      <slot class="grids" />

      <portal-target name="workspace-bottom" class="bottom" multiple />
    </div>

    <portal-target name="workspace-right" multiple />
  </div>
</template>

<script>
export default {
  name: 'MountingPoints'
}
</script>

<style scoped>
.mounts {
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 100%;
}

.mounts .centered {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
}

.mounts .centered .bottom {
  margin-top: auto;
}

.mounts .centered .grids {
  margin: auto;
}
</style>