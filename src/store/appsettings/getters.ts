import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { IAppState } from './state'

const getters: GetterTree<IAppState, StateInterface> = {
  boardX (state: IAppState) {
    return state.boardDimensionX
  }
}

export default getters
