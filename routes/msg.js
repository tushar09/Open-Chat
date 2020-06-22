var express = require('express');
var router = express.Router();
var msg = require('../api/Message');

router.post('/sendMsg', msg.sendMsg);
router.post('/history', msg.history);
router.post('/webCall', msg.sendCall);
router.post('/sendAns', msg.sendAns);
router.post('/sendCandi', msg.sendCandi);
router.post('/getTorrent', msg.getTorrent);

module.exports = router;