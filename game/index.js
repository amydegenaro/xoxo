import {Map} from 'immutable'

const initialState = {
  turn: 'X',
  board: Map()
}

const MOVE = 'MOVE';

const reducer = (state = initialState, action) => {
  // TODO
  const newState = Object.assign({}, state);
  switch(action.type) {
    case MOVE:
      newState.board = newState.board.setIn(action.position, action.player);
      newState.turn = action.player === 'X' ? 'O' : 'X';
      return newState;
      // return Object.assign({}, state, {
      //   turn: action.player === 'X' ? 'O' : 'X',
      //   board: state.board.setIn(action.position, action.player)
      // })
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

function winner(board) {
  // use streak function to check coords for each possible win condition
}

function streak(board, firstCoord, ...remainingCoords) {
  const player = board.getIn(firstCoord);

  // grab coords from arguments without board
  // check the coords passed in individually to see if they match or are undefined
  // if they all match the first coord, return that player value
  // otherwise return undefined


  for (let r = 0; r != 3; r++) {
    for (let c = 0; c != 3; c++) {
      board.getIn([r,c])
      if ()
    }
  }
}



export default reducer
