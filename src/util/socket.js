import io from 'socket.io-client'

const socket = io(`http://${location.hostname}:3001`)

socket.on('connect', () => console.log('socket.io connected'));
socket.on('disconnect', () => console.log('socket.io disconnected'))
socket.on('info', (data) => console.log('info: ' + data))
socket.on('state', (data) => console.log('state: ' + data))
socket.on('usercount', (data) => console.log('usercount: ' + data))

export const disconnect = () => socket.disconnect()
export const connect = () => socket.connect()

export const addListener = (eventName, cb) => {
  socket.on(eventName, cb)
  return null
}

export const newEmitter = eventName => msg => socket.emit(eventName, msg) && console.log('emitted ' + msg)
