<template>
  <base-window title="Toolbox" :unstyled="mounted" :showClose="false" settingsReference="toolbox">
    <template slot="body">

      <div class="toolbox" :class="windowClass" id="panels_toolbox">
        <div class="tools">
          <div 
            v-for="(tool, index) of tools"
            :key="index"

            class="tool"
            :class="{active: tool.id === selectedTool}"

            @click="switchTool(tool.id)"

            :title="toolName(tool)"
          >
            <div class="icon"><fa-icon :icon="tool.icon" /></div>
          </div>

          <colour-picker class="tool" />
        </div>
        
        <div class="tools end">
          <div class="tool" :class="{active: isImportVisible}" title="Toggle Import Window" @click="toggleWindowVisibility('import')">
            <div class="icon"><fa-icon icon="file-import" /></div>
          </div>
          <div class="tool" :class="{active: isExportVisible}" title="Toggle Export Window" @click="toggleWindowVisibility('export')">
            <div class="icon"><fa-icon icon="file-export" /></div>
          </div>

          <div class="tool" :class="{active: isTimelineVisible}" title="Toggle Timeline" @click="toggleTimelineVisibility">
            <div class="icon"><fa-icon icon="layer-group" /></div>
          </div>
          <div class="tool" :class="{active: isSettingsVisible}" title="Settings" @click="toggleSettingsVisibility">
            <div class="icon"><fa-icon icon="cog" /></div>
          </div>
        </div>
      </div>
    </template>
  </base-window>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import BaseWindow from '@/components/base/BaseWindow'
import ColourPicker from './ColourPicker/ColourPicker'

export default {
  name: "Toolbox",

  components: {
    BaseWindow,
    ColourPicker
  },

  props: {
    orientation: {
      type: String,
      default: "vertical"
    },
    mounted: {
      type: Boolean,
      default: true
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
  }},

  computed: {
    ...mapGetters({
      selectedTool: 'workspace/currentTool',
      isTimelineVisible: 'settings/isTimelineVisible',
      isSettingsVisible: 'settings/isVisible',
      isWindowVisible: 'settings/isWindowVisible',
      getSettings: 'settings/getToolbox'
    }),

    windowClass() {
      if(this.mounted) {
        return ["mounted", "mount-" + this.orientation];
      }

      return ["unmounted", "mount-" + this.orientation];
    },

    isExportVisible() {
      return this.isWindowVisible('export');
    },

    isImportVisible() {
      return this.isWindowVisible('import');
    },
  },

  methods: {
    ...mapMutations({
      switchTool: 'workspace/switchTool'
    }),
    ...mapActions({
      toggleTimelineVisibility: 'settings/toggleTimelineVisibility',
      toggleSettingsVisibility: 'settings/toggleSettingsVisibility',
      toggleWindowVisibility: 'settings/toggleSimpleWindowVisibility'
    }),

    toolName(tool) {
      return tool.name + ` (${tool.bind})`;
    }
  },

  created() {
    // Register binds for tools
    if(!this.getSettings.ready) {
      for(const tool of this.tools) {
        this.$keybinds.$on(tool.bind, () => {
          this.switchTool(tool.id);
        })
      }
    }
  }

}
</script>

<style scoped lang="scss">
.toolbox {
  display: flex;

  background-color: var(--secondary-bg-color);

  .tools {
    display: flex;
  }

  // Mounted to a panel need to extend to fit width / height
  &.mounted.mount-horizontal {
    width: 100%;
  }
  &.mounted.mount-vertical {
    height: 100%;
  }

  // Mounted or unmounted to a panel
  &.mount-horizontal {
    flex-direction: row;
    padding: .5rem 0;

    .end {
      padding-left: 0;
      margin-left: auto;
    }
  }

  &.mount-vertical {
    flex-direction: column;
    padding: 0 .5rem;

    .end {
      margin-top: auto;
      padding-top: 0;
    }
  }
}

.toolbox.mount-horizontal {
  flex-direction: row;

  .tools {
    padding: 0 1rem;
    flex-direction: row;
  }

  .tool:not(:last-of-type) {
    margin-right: .75rem;
  }
}
.toolbox.mount-vertical .tools {
  padding: 1rem 0;
  flex-direction: column;
  margin: 0 auto;

  .tool:not(:last-of-type) {
    margin-bottom: .75rem;
  }
}

.toolbox .tool {
  border-radius: .5rem;
  cursor: pointer;

  width: 2.5rem;
  height: 2.5rem;

  .icon {
    padding: .35rem;

    svg {
      width: 100%;
      height: 100%;

      color: #dddddd;
    }
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.05);

    .icon svg {
      color: #fff;
    }
  }

}
</style>