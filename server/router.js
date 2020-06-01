const app = require('express')
var mysql = require('mysql')
var router = app.Router()

var conn_sql = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'kanesa_service',
})
conn_sql.connect()

router.get('/api/user', function (req, res) {
  var query = conn_sql.query('SELECT * FROM users', (err, rows) => {
    if (err) throw err
    res.end(JSON.stringify(rows))
  })
})

module.exports = {router, conn_sql}
