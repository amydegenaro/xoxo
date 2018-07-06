// import reducer, {move, bad} from '.'

// /**
//  * moves(State) -> [...Action]
//  *
//  * Return an array of actions which are valid moves from the given state.
//  */
// export const moves = game => [] // TODO

// /**
//  * score(game: State, move: Action) -> Number
//  *
//  * Given a game state and an action, return a score for how good
//  * a move the action would be for the player whose turn it is.
//  *
//  * Scores will be numbers from -1 to +1. 1 is a winning state, -1
//  * is state from which we can only lose.
//  */
// const score = (game, move) => {
//   // TODO
// }

// /**
//  * play(state: State) -> Action
//  *
//  * Return the best action for the current player.
//  */
// export default state => undefined // TODO



// ------------ ANSWER TEXT -------------------------


import reducer, {move, bad} from '.'

const COORDS = [
  [0, 0], [0, 1], [0, 2],
  [1, 0], [1, 1], [1, 2],
  [2, 0], [2, 1], [2, 2],
]

export const moves = game => moves[game.turn]
  .filter(move => !bad(game, move))

moves.X = COORDS.map(coord => move('X', coord))
moves.O = COORDS.map(coord => move('O', coord))

const score = (game, move) => {
  const future = reducer(game, move)
  if (future.winner === move.player) return 1
  if (future.winner === 'draw') return 0

  if (!future.winner)
    // The game is still ongoing.
    // Find the best move for our opponent, and return the negation
    // of it.
    // That means that if the best our opponent can do is win (1),
    // then we score this move as -1, a loss, and vice versa.
    return -Math.max(...moves(future).map(move => score(future, move)))

  // Otherwise, the other person won. Score this move as -1.
  return -1
}

/**
 * Return the best action for the current player.
 *
 * @param {} state
 */
export default state => moves(state)
    .map(move => Object.assign({}, move, {
      score: score(state, move)
    }))
    .sort((a, b) => b.score - a.score)
    [0]
