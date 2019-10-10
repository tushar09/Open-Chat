var express = require('express');
var router = express.Router();
var db = require('../src/db/connector')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/aaa', function(req, res, next) {
  res.render('index', { title: 'fddgfdefg' });
});

router.get('/user', function(req, res, next) {
    db.query('select * from users', function(err, data) {
        res.send( data);
    })
});

module.exports = router;
