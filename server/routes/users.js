'use strict'
var express = require('express')
var router = express.Router()
var conn = require('./mysql')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/apis', function (req, res, next) {
  conn.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err
    res.end(JSON.stringify(rows))
  })
})

module.exports = router
