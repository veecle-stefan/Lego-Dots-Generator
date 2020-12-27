<template>
  <q-page class="q-pa-md">
    <div class="fit row wrap justify-around items-center content-stretch">
      <div class="col-12 col-sm-6">
        <picture-selector />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import PictureSelector from 'src/components/picselector.vue'

export default defineComponent({
  name: 'PageIndex',
  components: { PictureSelector },
  methods: {
    onClick () {
      console.log('Clicked on a fab action')
    }
  }
})
</script>

<style lang="scss">

</style>
