var express = require('express')
var socket = require('socket.io')
var mysql = require('mysql')
var fs = require('fs')
var app = express()
var http = require('http').createServer(app)
var port = process.env.PORT || 3000
var server = http.listen(port, function () {
  console.log(`Listening ${port}`)
})

var io = socket(server)
app.use(express.static('public'))

var conn_sql = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'kanesa_service',
})
conn_sql.connect()

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

app.get('/api/user', function (req, res) {
  var query = conn_sql.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err
    res.end(JSON.stringify(rows))
  })
})

const getApiAndEmit = (socket) => {
  const response = new Date()
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response)
}
