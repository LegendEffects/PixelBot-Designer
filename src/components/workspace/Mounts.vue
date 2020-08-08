<template>
  <div class="mounts">
    <portal-target name="workspace-left" />

    <div class="centered">
      <portal-target name="workspace-top" />

      <slot />

      <portal-target name="workspace-bottom" />
    </div>

    <portal-target name="workspace-right" />
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
</style>