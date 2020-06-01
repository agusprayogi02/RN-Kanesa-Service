const express = require('express')
const socket = require('socket.io')
const root = require('./router')
const http = require('http')

var app = express()
var port = process.env.PORT || 3000
var server = http.createServer(app)

var io = socket(server)
app.use(express.static('public'))
app.use(root.router)

let interval

io.on('connection', (socket) => {
  console.log(`New client ${socket.id} connected`)
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000)
  // socket.on('getUser', function (params) {})
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected`)
    clearInterval(interval)
  })
})

const getApiAndEmit = (socket) => {
  const response = new Date()
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response)
}

server.listen(port, function () {
  console.log(`Listening ${port}`)
})
