import React from 'baret'
import Bacon from 'baconjs'
import {addListener, newEmitter} from '../../util/socket.js'


const move = newEmitter('move')

const moveBus = new Bacon.Bus()

const moveStream = moveBus
  .map(m => move(m))

const stateMap = {
  'new game': 'New game started! Choose your weapon',
  'waiting': 'Waiting for an opponent...',
  'opponent disconnect': 'Opponent disconnected, waiting for new opponent'
}

const scoreStream = Bacon
  .fromBinder(sink => addListener('score', sink))

const yourScore = scoreStream.map(e => e[0])
const opponentScore = scoreStream.map(e => e[1])

const stateStream = Bacon
  .fromBinder(sink => addListener('state', sink))

const combineStateStream = Bacon
  .when([moveStream, stateStream.toProperty()],
        (move, state) => state === 'new game' ? 'Waiting for opponent to make a move' : null,
        [stateStream], state => stateMap[state])
  .filter(e => e)

const gameStream = Bacon.fromBinder(sink => addListener('game', sink))
const RPS = () =>
  <div>
    <div>
      Score:
      <p> You: {yourScore}</p>
      <p> Opponent: {opponentScore}</p>
    </div>
    <p>
      {combineStateStream}
    </p>
    <p>
      {gameStream}
    </p>
    <button onClick={() => moveBus.push(0)}> Rock </button>
    <button onClick={() => moveBus.push(1)}> Paper </button>
    <button onClick={() => moveBus.push(2)}> Scissors </button>
  </div>

export default RPS
