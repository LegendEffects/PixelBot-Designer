<template>
  <div class="toolbox" id="panels_toolbox">
    <div class="tools">
      <div 
        v-for="(tool, index) of tools"
        :key="index"

        class="tool"
        :class="{active: tool.name === tool}"

        @click="switchTool(tool.id)"

        :title="toolName(tool)"
      />
    </div>
    
    <div class="end">
    
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "Toolbox",

  computed: {
    ...mapGetters({
      tool: 'workspace/currentTool'
    }),
    ...mapMutations({
      switchTool: 'workspace/switchTool'
    })
  },

  methods: {
    toolName(tool) {
      return tool.name + ` (${tool.bind})`;
    }
  },

  data() {return {
    tools: [
      {
        id: 'pen',
        name: 'Pen',
        icon: 'pen',
        bind: 'b'
      },
      {
        id: 'eraser',
        name: 'Eraser',
        icon: 'eraser',
        bind: 'e'
      },
      {
        id: 'eyeDropper',
        name: 'Eye Dropper',
        icon: 'eye-dropper',
        bind: 'i'
      },
      {
        id: 'fillBucket',
        name: 'Fill Bucket',
        icon: 'fill',
        bind: 'g'
      }
    ]
  }}
}
</script>

<style scoped lang="scss">
.toolbox {
  display: flex;
  flex-direction: column;

  background-color: var(--secondary-bg-color);

  height: 100%;
  
  padding: 0 1rem;
}
</style>