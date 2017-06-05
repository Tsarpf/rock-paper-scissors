import React from 'baret'
import Bacon from 'baconjs'
import {addListener, newEmitter} from '../../util/socket.js'

import spectre from '../../../node_modules/spectre.css/docs/dist/spectre.css'

const stateStream = Bacon
      .fromBinder(sink => addListener('state', sink))

const sendChat = (() => {
  const s = newEmitter('chat')
  return (msg) => {
    s(msg)
    return ''
  }
})()

const textBus = new Bacon.Bus()
const clickBus = new Bacon.Bus()

const textStream = Bacon.update('',
                                [textBus.toProperty(''), clickBus],
                                (previous, text) => sendChat(text),
                                [textBus], (previous, t) => t)

const messages = Bacon
      .fromBinder(sink => addListener('chat', sink))

const messageStream = Bacon
      .update(
        [],
        [stateStream], (acc, state) => state === 'opponent change' ? [] : acc,
        [messages], (acc, c) => {
          acc.push(c)
          return acc
        },
        [textBus.toProperty(), clickBus], (acc, t) => {
          acc.push(t)
          return acc
        })

const Chat = () => {
  const list = messageStream.map(lines => lines.map(text => <li>{text}</li>))
  return (
      <div>
      <input type="text" value={textStream} onChange={e => textBus.push(e.target.value)}/>
      <button className={spectre.btn + ' ' + spectre['btn-primary']}  onClick={() => clickBus.push()}> send </button>
        <ul>
          {list}
        </ul>
      </div>
  )
}

export default Chat
