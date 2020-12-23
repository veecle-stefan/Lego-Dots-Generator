<template>
  <q-page class="q-pa-md backimg">
    <div class="fit row wrap justify-around items-center content-stretch">
      <div class="col-12 col-sm-6">
      <img class=" applogo" src="graphics/picselart-text-only.png" />
      </div>
      <div class="col-12 col-sm-6">
        <div class="text-h5">{{ $t('about.title')}}</div>
        <div>{{ $t('about.description')}}</div>
      </div>
      <div class="col-12 col-sm-6 q-ma-md">
        <div class="text-h6">{{ $t('about.imprint')}}</div>
        <div v-html="$t('about.legal')"></div>
      </div>
      <div class="col-12 col-sm-6 q-ma-md">
        <div class="text-h6">{{ $t('about.software')}}</div>
        <div v-html="$t('about.swdesc')"></div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'About'
})
</script>

<style lang="scss">
.applogo {
  max-width: 20vw;
  height: auto;
}

.backimg {
  background-image: url('/graphics/picselart-dots-only.png');
  background-size: cover;
}
</style>
