var constants = require('../utils/Constant');
var db = require('../src/db/connector');
var FCM = require('fcm-node');
var fcm = new FCM(constants.serverKey);

module.exports = {
    sendMsg: function(req, res){
        const payLoad = req.body;
        var message = {
            to: '/topics/'.concat(payLoad.topic),
            data:{
                type: constants.msgType.text,
                sender: payLoad.sender,
                msg: payLoad.msg,
                msgId: payLoad.msgId,
                createdAt: payLoad.createdAt
            }
        };
        fcm.send(message, function(err, response){
            return res.send({ response, success: err });
        });
    }
}