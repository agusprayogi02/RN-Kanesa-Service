var express = require('express')
var router = express.Router()
var conn = require('./server')
var util = require('../public/javascripts/utils')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.get('/users', function (req, res, next) {
  conn.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err
    res.end(JSON.stringify(rows))
  })
})

router.post('/make', function (req, res, next) {
  var uid = 'U' + req.body.level + 'ID' + util.randomInt()
  let data = {
    uid: uid,
    NISN: req.body.nisn,
    nama: req.body.nama,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    kelas: req.body.kelas,
    jenisK: req.body.jenis,
    level: req.body.level,
    status: 1,
  }
  let sql = 'INSERT INTO users SET ?'
  let query = conn.query(sql, data, (err, rows) => {
    if (err) throw err
    res.end(JSON.stringify(data))
  })
})

router.post('/login', (req, res, next) => {
  let email = {email: req.body.email}
  let pass = {password: req.body.password}
  let sql = 'SELECT * FROM users WHERE ? AND ?'
  let error = {error: 'Email atau Password Salah!'}
  conn.query(sql, [email, pass], (err, rows) => {
    if (err) throw err
    res.end(JSON.stringify(rows))
  })
})

module.exports = router
