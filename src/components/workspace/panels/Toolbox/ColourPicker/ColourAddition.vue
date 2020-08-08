<template>
  <base-window title="Add Swatch" @close="$emit('close')">
    <template slot="body">
      <form class="addition" @submit.prevent="submit">
        <div class="pad">
          <label for="charCode" :class="{'code-taken': isColourCodeTaken}">Code:</label>&nbsp;&nbsp;
          <input type="text" id="charCode" minlength=1 maxlength=1 v-model="form.char" style="width: 3rem" placeholder="EG: A">

          <br>
          <label for="colour">Colour:</label>&nbsp;&nbsp;
          <input type="color" id="colour" v-model="form.colour">
        </div>

        <button type="submit" class="btn fluid dusk">Add</button>
      </form>
    </template>
  </base-window>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

import BaseWindow from '@/components/base/BaseWindow'

export default {
  components: {
    BaseWindow
  },

  computed: {
    ...mapGetters({
      palette: 'workspace/currentPalette',
      rawPalette: 'workspace/rawPalette'
    }),

    isColourCodeTaken() {
      return this.rawPalette[this.form.code] !== undefined;
    }
  },

  data() {return {
    form: {
      char: "",
      colour: "#ffffff"
    }
  }},

  methods: {
    ...mapMutations({
      addSwatch: 'workspace/addSwatch'
    }),

    submit() {
      if(this.form.char.length !== 1) {
        this.$toasted.error("A code needs to be provided for the colour!");   
        return;
      }

      if(Object.values(this.palette).includes(this.form.colour)) {
        this.$toasted.error("That colour is already in the palette!");
        return;
      }

      this.addSwatch({
        code: this.form.char,
        hex: this.form.colour
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.pad {
  padding: 1rem;
  color: #fff;
}
</style>