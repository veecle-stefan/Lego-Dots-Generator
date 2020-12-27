import { store } from 'quasar/wrappers'
import Vuex from 'vuex'
import appsettings from './appsettings'
import { IAppState } from './appsettings/state'
import createPersistedState from 'vuex-persistedstate'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  appState: IAppState
}

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      appsettings
    },

    plugins: [createPersistedState()],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING
  })

  return Store
})
