import { LocalStorage } from 'quasar'
import { AppDefaults } from './defaults'

const Interceptor = {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  set: function (target: AppDefaults, prop: keyof AppDefaults, value: any, _receiver: any): boolean {
    if (prop in target) {
      // it's a valid item. Store it in local storage
      LocalStorage.set(String(prop), value)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      Reflect.set(target, prop, value, _receiver)
      return true
    } else {
      return false
    }
  }
}

type KeysOfType<T, U> = { [k in keyof T]-?: T[k] extends U ? k : never }[keyof T];

const CreateProxy = function (settings: AppDefaults) {
  function loadDefaults (settings: AppDefaults) {
    for (const prop in settings) {
      const propIndexNum = prop as KeysOfType<AppDefaults, number >
      const propIndexStr = prop as KeysOfType<AppDefaults, string >
      const loaded = LocalStorage.getItem(String(prop))
      if (loaded != null) {
        // we found a stored value, overwrite our default
        // settings[prop] = loaded
        if (typeof (loaded) === 'number') {
          settings[propIndexNum] = loaded
        }
        if (typeof (loaded) === 'string') {
          settings[propIndexStr] = loaded
        }
      }
    }
  }

  loadDefaults(settings)
  return new Proxy(settings, Interceptor)
}

export const AppSettingProxy = CreateProxy(new AppDefaults())
