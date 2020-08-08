<template>
  <base-window title="Import" @close="setVisibility({name: 'import', val: false})" v-show="isVisible">
    <template slot="body">

      <div class="pad">
        <textarea class="form-control" v-model="input">
        </textarea>

        <div>
          <button class="btn dusk" @click="importText">Import</button>
        </div>
      </div>

    </template>
  </base-window>
</template>

<script>
import BaseWindow from '@/components/base/BaseWindow'
import { mapGetters, mapMutations } from 'vuex'

import pbot from '@/pbot-lib'

// import pbot from '@/pbot-lib.js'

export default {
  components: {
    BaseWindow
  },

  data() {return {
    input: "",
    error: null
  }},

  computed: {
    ...mapGetters({
      getCurrentFrame: 'workspace/currentFrame',

      getFrame: 'workspace/getFrame',
      getAllFrames: 'workspace/allFrames',

      getAnimationDelay: 'workspace/animationDelay',
      isWindowVisible: 'settings/isWindowVisible'
    }),

    isVisible() {
      return this.isWindowVisible('import');
    }
  },
  
  methods: {
    ...mapMutations({
      setVisibility: 'settings/setSimpleWindowVisibility',
      setFrameDrawing: 'workspace/setFrameDrawing',
      
      addSwatch: 'workspace/addSwatch',
    }),

    importText() {
      const imp = pbot.importText(this.input);

      if(imp.error) {
        this.error = "There was an error while importing.";
        return;
      }

      for(const frameI in imp.frames) {
        const frame = pbot.convertFrameToObject(imp.frames[frameI]);
        this.setFrameDrawing({
          frameNum: parseInt(this.getCurrentFrame) + parseInt(frameI),
          frame
        });
      }

      if(imp.palette !== null && Object.values(imp.palette).length !== 0) {
        for(const identifier in imp.palette) {
          this.addSwatch({
            code: identifier,
            hex: imp.palette[identifier]
          });
        }
      }

    }
  }
}
</script>