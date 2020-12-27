import { MutationTree } from 'vuex'
import { IAppState } from './state'
import { MutationTypes } from './mutationtypes'

const mutation: MutationTree<IAppState> = {
  [MutationTypes.SET_BOARD_X] (state, newX: number) {
    state.boardDimensionX = newX
  },
  [MutationTypes.SET_BOARD_Y] (state, newY: number) {
    state.boardDimensionY = newY
  }
}

export default mutation
