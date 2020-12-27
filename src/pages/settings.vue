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
            <div class="col">
            </div>
            <div class="col-12 col-sm-auto">
              <div class="row justify-left sliderhorizontal">
                <q-slider
                  class="col-12"
                  dark
                  v-model="$settings.boardWidth"
                  :min="32"
                  :max="64"
                  :step="4"
                  snap
                  label
                  markers
                  label-always
                  color="primary"
                />
                <q-slider
                  class="col-2"
                  dark
                  v-model="$settings.boardHeight"
                  :min="32"
                  :max="64"
                  :step="4"
                  snap
                  label
                  markers
                  label-always
                  vertical
                  color="primary"
                />
                <div class="col-10" style="width: 150px; height: 150px;">
                  <div class="aspectpreview" :style="{width: boardWidth * 2 + 'px', height: boardHeight * 2 + 'px'}">
                    <q-badge color="secondary">
                      {{ boardWidth }} x {{ boardHeight }} <br />
                      {{ aspectratio() }}
                    </q-badge>
                  </div>
                </div>
              </div>
            </div>
            <div class="col">
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

@Component
export default class Settings extends Vue {
  selectedlanguage = null
  langOptions = [
    { value: 'en-us', label: 'English' },
    { value: 'de', label: 'Deutsch' }
  ]

  gcd (a: number, b: number): number {
    if (!b) {
      return a
    }
    return this.gcd(b, a % b)
  }

  get boardWidth (): number {
    return this.$settings.boardWidth
  }

  get boardHeight (): number {
    return this.$settings.boardHeight
  }

  aspectratio (): string {
    const w = this.boardWidth
    const h = this.boardHeight
    const g = this.gcd(w, h)
    return `${w / g}:${h / g}`
  }
}
</script>

<style lang="scss">
.aspectpreview {
  border: 4px solid $primary;
  margin-left: 30px;
  margin-top: 20px;
  padding: 5px;
  text-align: center;
  vertical-align: middle;
}

.sliderhorizontal {
  min-width: 400px;
}
</style>
