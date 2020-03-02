var constants = require('../utils/Constant');
var db = require('../src/db/connector');
var FCM = require('fcm-node');
var fcm = new FCM(constants.serverKey);

module.exports = {
    sendMsg: function(req, res){
        const payLoad = req.body;

        //const query = `select * from users where phone like "%${payLoad.phone}"`;
        const query = `insert into topics values(null, "${payLoad.topic}") on duplicate key update name = "${payLoad.topic}"`;
        db.query(query, function(error, data){
        });

        const queryMsg = `insert into msg values(
            null,
            (select id from users where phone = "${payLoad.sender}"),
            "${payLoad.msg}",
            (select id from topics where name = "${payLoad.topic}"),
            now(),
            now()
        )`;

        db.query(queryMsg, function(err, data){

        });

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
    },
    history: function(req, res){
        
        const payLoad = req.body;
        var query;

        if(payLoad.id == 0){
            query = `SELECT * FROM msg 
            WHERE id < 
            (SELECT max(id) FROM msg)
            and
            topics_id = (select id from topics where name = "${payLoad.topic}")
            order by id 
            LIMIT 100`;
        }else{
            query = `SELECT * FROM msg 
            WHERE id < 
            ${payLoad.id}
            and
            topics_id = (select id from topics where name = "${payLoad.topic}")
            order by id 
            LIMIT 100`;
        }
        console.log(query);
        db.query(query, function(err, data){
            if(err){
                console.log(err);
                res.send(err);
            }else{
                res.send(data);
            }
        });

        
    }
}