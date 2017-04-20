import React from 'baret'
import Bacon from 'baconjs'
import {addListener, newEmitter} from '../../util/socket.js'


const move = newEmitter('move')

const moveBus = new Bacon.Bus()

const moveStream = moveBus
  .map(m => move(m))

const stateMap = {
  'new game': 'Game started',
  'waiting': 'Waiting for an opponent...'
}

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
      {combineStateStream}
    </div>
    <div>
      {gameStream}
    </div>
    <button onClick={() => moveBus.push(0)}> Rock </button>
    <button onClick={() => moveBus.push(1)}> Paper </button>
    <button onClick={() => moveBus.push(2)}> Scissors </button>
  </div>

export default RPS
