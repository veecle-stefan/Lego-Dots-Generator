<template>
  <q-page class="row items-center justify-evenly">
    <img class="boardpreview" src="graphics/empty-board.png" />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-fab
              icon="add"
              direction="up"
              vertical-actions-align="right"
              color="accent"
            >
              <q-fab-action @click="onClick" color="primary" :label="$t('takephoto')" icon="add_a_photo" />
              <q-fab-action @click="onClick" color="primary" :label="$t('fromcameraroll')" icon="photo_library" />
            </q-fab>
          </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'PageIndex',
  methods: {
    onClick () {
      console.log('Clicked on a fab action')
    }
  }
})
</script>

<style lang="scss">
.boardpreview {
  height: 40vh;
  max-height: 500px;
}
</style>
