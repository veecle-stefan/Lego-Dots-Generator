<template>
  <img class="boardpreview" src="graphics/empty-board.png" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'GalleryPicture'
})
</script>

<style lang="scss">
.boardpreview {
  height: 40vh;
  max-height: 500px;
}
</style>
