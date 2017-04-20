import io from 'socket.io-client'

const socket = io('http://localhost:3001')

socket.on('connect', () => console.log('socket.io connected'));
socket.on('disconnect', () => console.log('socket.io disconnected'))
socket.on('info', (data) => console.log('info: ' + data))
socket.on('state', (data) => console.log('state: ' + data))

export const addListener = (eventName, cb) => socket.on(eventName, cb)

export const newEmitter = eventName => msg => socket.emit(eventName, msg) && console.log('emitted ' + msg)
