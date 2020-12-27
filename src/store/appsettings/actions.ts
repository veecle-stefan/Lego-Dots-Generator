import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { IAppState } from './state'

const actions: ActionTree<IAppState, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default actions
