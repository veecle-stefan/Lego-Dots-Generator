<template>
  <q-page class="q-pa-md">
    <picture-selector />
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
