<template>
  <div class="workspace" id="workspace_view" v-if="$store.state.ready">
    <div class="workspace-floats">
      <portal to="workspace-left">
        <toolbox />
      </portal>
    </div>

    <mounting-points>
      <grid-array />
    </mounting-points>
    
  </div>
</template>

<script>
// @ is an alias to /src
import MountingPoints from "@/components/workspace/Mounts"
import GridArray from "@/components/workspace/GridArray"

import Toolbox from "@/components/workspace/panels/Toolbox" 

export default {
  name: 'Workspace',
  
  components: {
    GridArray,
    MountingPoints,

    Toolbox
  }
}
</script>
