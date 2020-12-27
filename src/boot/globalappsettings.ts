import { boot } from 'quasar/wrappers'
import { AppSettingProxy } from '../appsettings'
import { AppDefaults } from 'src/appsettings/defaults'
import Vue from 'vue'

/**
 * Makes the type known to Vue.$elexir
 */
declare module 'vue/types/vue' {
  interface Vue {
    $settings: AppDefaults;
  }
}

const vuesettings = Vue.observable(AppSettingProxy)
/**
 * Registers our class to Vue.$elexir globally
 */
export default boot(({ Vue }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Vue.prototype.$settings = vuesettings
})
