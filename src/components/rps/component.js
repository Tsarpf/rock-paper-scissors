import React from 'baret'
import Bacon from 'baconjs'
import {addListener, newEmitter} from '../../util/socket.js'


const move = newEmitter('move')
const gameStream = Bacon.fromBinder(sink => addListener('game', sink))
const stateStream = Bacon.fromBinder(sink => addListener('state', sink))
                         .map(state => {
                           switch (state) {
                             case 'new game':
                               return 'Game started!'
                             case 'waiting':
                               return 'Waiting for another player... Please wait'
                             default:
                               return 'Something is hopefully happening...'
                           }
                         })

const RPS = () =>
  <div>
    <div>
      {stateStream}
    </div>
    <div>
      {gameStream}
    </div>
    <button onClick={() => move(0)}> Rock </button>
    <button onClick={() => move(1)}> Paper </button>
    <button onClick={() => move(2)}> Scissors </button>
  </div>

export default RPS
