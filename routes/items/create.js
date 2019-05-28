var express = require('express');
var mysql = require('mysql');
var confDB = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_node'
};

var router = express.Router();
var connection = mysql.createConnection(confDB);

/* GET home page. */
router.post('/create', function(req, res, next) {
  var idItem = req.body.id;
  var nameItem = req.body.name;
  var descItem = req.body.description;

  var sql = "INSERT INTO items values ('" + idItem + "', '" + nameItem + "', '" + descItem + "')";
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err
    res.json({status: true, data: 'Items was created'});
  });
});

router.put('/update', function(req, res, next) {
  var idItem = req.body.id;
  var nameItem = req.body.name;
  var descItem = req.body.description;

  var sql = "update items set name = '" + nameItem + "', description = '" + descItem + "'  where id = '" + idItem + "'";
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err
    res.json({status: true, data: 'Items was updated'});
  });
});

router.delete('/delete', function(req, res, next) {
  var idItem = req.body.id;

  var sql = "delete from items where id = '" + idItem + "'";
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err
    res.json({status: true, data: 'Items was deleted'});
  });
});

router.post('/select-option', function(req, res, next) {
  var idItem = req.body.id;
  var sql = "select * from items where id = " + idItem;
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err
    
    if (rows.length > 0) {
      res.json({status: true, data: rows});
    } else {
      res.json({status: false, data: null});
    } 
  });
  connection.end();
});

router.get('/select', function(req, res, next) {
  var sql = "select * from items";
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err
    
    if (rows.length > 0) {
      res.json({status: true, data: rows});
    } else {
      res.json({status: false, data: null});
    }
  });
  connection.end();
});

module.exports = router;