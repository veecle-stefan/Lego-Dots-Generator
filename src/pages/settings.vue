<template>
  <q-page class="q-pa-md bg-grey-10" dark>
    <div class="column justify-center">
    <q-list bordered padding dark class="col-12">
      <q-item-label header>{{ $t('settingsapp') }}</q-item-label>

      <q-item v-ripple>
        <q-item-section>
          <q-select dark v-model="selectedlanguage" :options="languages" :label="$t('language')" />
          <q-item-label caption>
            {{ $t('languagedesc') }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Settings',
  data () {
    return {
      selectedlanguage: null,
      languages: [
        'English', 'Deutsch'
      ]
    }
  },
  methods: {
    saveSettings: function () {
      try {
        this.$q.localStorage.set('test', '1234')
      } catch (e) {
        // data wasn't successfully saved due to
        // a Web Storage API error
      }
    }
  }
  
})
</script>

<style lang="scss">

</style>
