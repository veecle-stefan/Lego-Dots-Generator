<template>
  <q-page class="row items-center justify-evenly">
    <gallery-picture />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import GalleryPicture from 'src/components/gallerypic.vue'

export default defineComponent({
  name: 'Gallery',
  components: { GalleryPicture }
})
</script>

<style lang="scss">

</style>
