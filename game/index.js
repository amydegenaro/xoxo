import {Map} from 'immutable'

const initialState = {
  turn: 'X',
  board: Map()
}

const MOVE = 'MOVE';

const reducer = (state = initialState, action) => {
  // TODO
  switch(action.type) {
    case MOVE:
      return Object.assign({}, state, {
        turn: action.player === 'X' ? 'O' : 'X',
        board: state.board.setIn(action.position, action.player)
      })
    default:
      return state
  }
}

export const move = (player, position) => {
  return {
    type: MOVE,
    position: position,
    player: player
  }
}

export default reducer
