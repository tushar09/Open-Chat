var express = require('express');
var router = express.Router();
var profile = require('../api/Profile');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resourc');
});

router.post('/createUser', profile.create);
router.post('/checkUser', profile.checkUser);
router.post('/login', profile.login);
router.post('/getUsers', profile.users);
router.post('/msgHistory', profile.msg);
router.post('/sendNotification', profile.sendNotification);
router.post('/sendOnline', profile.online);


module.exports = router;
