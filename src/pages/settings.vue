<template>
  <q-page class="q-pa-md bg-grey-10" dark>
    <div class="column justify-center">
    <q-list bordered padding dark class="col-12">
      <q-item-label header>{{ $t('settings.general') }}</q-item-label>
      <q-item v-ripple>
        <q-item-section>
           <q-select
              dark
              v-model="$i18n.locale"
              :options="langOptions"
              emit-value
              map-options
              style="min-width: 150px"
              @change="changedSetting('language', $event)"
            />
          <q-item-label caption>
            {{ $t('settings.languagedesc') }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list bordered padding dark class="col-12">
      <q-item-label header>{{ $t('settings.legoparts') }}</q-item-label>
      <q-item v-ripple>
        <q-item-section>
          <div class="row q-pa-md">
            <q-slider
              class="col-12"
              dark
              v-model="numpixelsx"
              :min="32"
              :max="64"
              :step="4"
              snap
              label
              markers
              label-always
              color="primary"
              @change="changedSetting('numpixelsx', $event)"
            />
            <q-slider
              class="col-2"
              dark
              v-model="numpixelsy"
              :min="32"
              :max="64"
              :step="4"
              snap
              label
              markers
              label-always
              vertical
              color="primary"
              @change="changedSetting('numpixelsy', $event)"
            />
            <div class="col-10" style="width: 150px; height: 150px;">
              <div class="aspectpreview" :style="{width: numpixelsx * 2 + 'px', height: numpixelsy * 2 + 'px'}">
                <q-badge color="secondary">
                  {{ numpixelsx }} x {{ numpixelsy }} <br />
                  {{ aspectratio() }}
                </q-badge>
              </div>
            </div>
          </div>
          <q-item-label caption>
            {{ $t('settings.pixeldesc') }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { MutationTypes } from '../store/appsettings/mutationtypes'

@Component
export default class Settings extends Vue {
  selectedlanguage = null
  langOptions = [
    { value: 'en-us', label: 'English' },
    { value: 'de', label: 'Deutsch' }
  ]

  get numpixelsx (): number {
    return this.$store.state.appsettings.boardDimensionX
  }

  set numpixelsx (value: number) {
    this.$store.commit('appsettings/' + MutationTypes.SET_BOARD_X, value)
  }

  get numpixelsy (): number {
    return this.$store.state.boardDimensionY
  }

  set numpixelsy (value: number) {
    this.$store.commit(MutationTypes.SET_BOARD_Y, value)
  }

  changedSetting (propname: string, newVal: string) {
    console.log(`User changed ${propname} to ${newVal}`)
    try {
      this.$q.localStorage.set(propname, newVal)
    } catch (e) {
      // data wasn't successfully saved due to
      // a Web Storage API error
      this.$q.notify(this.$t('err.localstorage'))
    }
  }

  gcd (a: number, b: number): number {
    if (!b) {
      return a
    }
    return this.gcd(b, a % b)
  }

  aspectratio (): string {
    const g = this.gcd(this.numpixelsy, this.numpixelsx)
    return `${this.numpixelsy / g}:${this.numpixelsx / g}`
  }
}
</script>

<style lang="scss">
.aspectpreview {
  border: 4px solid $primary;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  text-align: center;
  vertical-align: middle;
}
</style>
