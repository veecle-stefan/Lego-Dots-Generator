import { LocalStorage } from 'quasar'
import { AppDefaults } from './defaults'

const Interceptor = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: function (target: AppDefaults, prop: keyof AppDefaults, receiver: any) {
    if (!(prop in target)) {
      return undefined
    } else {
      const res = LocalStorage.getItem(String(prop))
      if (res != null) {
        // found it saved in local storage
        return res
      } else {
        // return default value
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Reflect.get(target, prop, receiver)
      }
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  set: function (target: AppDefaults, prop: keyof AppDefaults, value: any, _receiver: any): boolean {
    if (prop in target) {
      // it's a valid item. Store it in local storage
      LocalStorage.set(String(prop), value)
      return true
    } else {
      return false
    }
  }
}

export const AppSettingProxy = new Proxy(new AppDefaults(), Interceptor)
