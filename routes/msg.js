var express = require('express');
var router = express.Router();
var msg = require('../api/Message');

router.post('/sendMsg', msg.sendMsg);

module.exports = router;