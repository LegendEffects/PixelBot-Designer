<template>
  <div class="workspace" id="workspace_view" v-if="$store.state.ready">
    <portal-target name="float" multiple />
    <portal-target name="workspace-float" multiple />

    <div class="workspace-floats">
      <portal :to="'workspace-' + getTargetPortal(getTimeline.mount)">
        <timeline :orientation="getOrientation(getTimeline.mount)" :mounted="isMounted(getTimeline.mount)" />
      </portal>

      <portal  :to="'workspace-' + getTargetPortal(getToolbox.mount)">
        <toolbox :orientation="getOrientation(getToolbox.mount)" :mounted="isMounted(getToolbox.mount)" />
      </portal>

      <settings />

      <export />
      <import />
    </div>

    <mounting-points>
      <grid-array />
    </mounting-points>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import MountingPoints from "@/components/workspace/Mounts"
import GridArray from "@/components/workspace/GridArray"

import Toolbox from "@/components/workspace/panels/Toolbox/Toolbox" 
import Timeline from "@/components/workspace/panels/Timeline/Timeline"
import Settings from "@/components/workspace/panels/Settings/Settings"
import Export from "@/components/workspace/panels/interface/Export"
import Import from "@/components/workspace/panels/interface/Import"

export default {
  name: 'Workspace',
  
  components: {
    GridArray,
    MountingPoints,

    Toolbox,
    Timeline,
    Settings,
    Export,
    Import
  },

  computed: {
    ...mapGetters({
      getToolbox: 'settings/getToolbox',
      getTimeline: 'settings/getTimeline'
    })
  },

  methods: {
    getOrientation(mount) {
      switch(mount) {
        case 'top':
        case 'bottom':
        case 'float-horizontal':
          return 'horizontal';

        case 'left':
        case 'right':
        case 'float-vertical':
          return 'vertical';
      }
    },

    getTargetPortal(mount) {
      switch(mount) {
        case 'float-vertical':
        case 'float-horizontal':
          return 'float';  
      }
      return mount;
    },
    
    isMounted(mount) {
      switch(mount) {
        case 'float-vertical':
        case 'float-horizontal':
          return false;
      }

      return true;
    }
  }
}
</script>
