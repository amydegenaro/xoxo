import {Map} from 'immutable'

// const initialState = {
//   turn: 'X',
//   board: Map()
// }

const MOVE = 'MOVE';

const turnReducer = (player = 'X', action) => {
  if (action.type === MOVE) {
    return player === 'X' ? 'O' : 'X';
  }
  return player;
};

const boardReducer = (board=Map(), action) => {
  if (action.type === MOVE){
   return board.setIn(action.position, action.player)
  }
  return board;
};

const reducer = (state = {}, action) => {
  const error = bad(state, action);
  if (error) return Object.assign({}, state, { error })

  const newBoard = boardReducer(state.board, action);
  return {
    board: newBoard,
    turn: turnReducer(state.turn, action),
    winner: winner(newBoard)
  };
};

// ACTION CREATOR
export const move = (player, position) => {
  return {
    type: MOVE,
    position: position,
    player: player
  };
};

function bad(state, action) {
  console.log('THIS IS THE STATE', state)
  console.log('THIS IS THE ACTION', action)
  // it can't access the array by bracket notation

  if (action.type === MOVE) {
    if (action.player !== state.turn) return `It's not your turn!`

    if (Array.isArray(action.position)) {
      // console.log('ACTION POSITION', action.position)
      if (action.position.length !== 2) return `Position is invalid`
      if (action.position[0] > 2 || action.postion[0] < 0) {
        return `Position is invalid`
      } else if (action.position[1] > 2 || action.position[1] < 0) {
        return `Position is invalid`
      }
    } else {
      return `Position is invalid`
    }

    if (state.board.getIn(action.position)) {
      return `That square is already taken!`
    }
  }

  return null
}

function winner(board) {
  // use streak function to check coords for each possible win condition
const row1 = streak(board,[0,0], [0,1], [0,2])
if(row1) return row1;
const row2 = streak(board, [1,0], [1,1], [1,2])
if(row2) return row2;
const row3 = streak(board,[2,0], [2,1], [2,2])
if(row3) return row3;
const col1 = streak(board, [0,0], [1,0], [2,0] )
if(col1) return col1;
const col2 = streak(board, [0,1], [1,1], [2,1] )
if(col2) return col2;
const col3 = streak(board, [0,2], [1,2], [2,2] )
if(col3) return col3;
const diag1 = streak(board, [2,0], [1,1], [0,2])
if(diag1) return diag1;
const diag2 = streak(board, [0,0], [1,1], [2,2])
if(diag2) return diag2;

for(let r = 0; r !=3; r++){
  for(let c = 0; c !=3; c++){
    if(!board.hasIn([r,c])){
      return null;
    }
  }
}
return 'draw'
}


function streak(board, firstCoord, ...remainingCoords) {
  const playerVal = board.getIn(firstCoord);
  const coords = [...remainingCoords]
  for (let i = 0; i <coords.length; i++){
    if (board.getIn(coords[i]) !== playerVal){
      return undefined;
    }
  }
  return playerVal;
}
  // grab coords from arguments without board
  // check the coords passed in individually to see if they match or are undefined
  // if they all match the first coord, return that player value
  // otherwise return undefined


export default reducer;

/////////////////////////////

// const reducer = (state = initialState, action) => {
//   // TODO
//   const newState = Object.assign({}, state);
//   switch(action.type) {
//     case MOVE:
//       newState.board = boardReducer(newState, action)
//       newState.turn = turnReducer()
//       return newState;
//       // return Object.assign({}, state, {
//       //   turn: action.player === 'X' ? 'O' : 'X',
//       //   board: state.board.setIn(action.position, action.player)
//       // })
//     default:
//       return state
//   }
// }
