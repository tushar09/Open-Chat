var express = require('express');
var router = express.Router();
var profile = require('../api/Profile');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resourc');
});

router.post('/createUser', profile.create);

module.exports = router;
