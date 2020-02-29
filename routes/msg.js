var express = require('express');
var router = express.router;
var msg = require('../api/Message');

router.post('/sendMsg', msg.sendMsg);