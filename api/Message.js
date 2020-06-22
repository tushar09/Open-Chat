var constants = require('../utils/Constant');
var db = require('../src/db/connector');
var FCM = require('fcm-node');
var fcm = new FCM(constants.serverKey);
var magnetToTorrent = require('magnet-to-torrent');

module.exports = {
    sendMsg: function(req, res){
        const payLoad = req.body;

        var senderName = "";
        const senderQuery = `select * from users where phone = "${payLoad.sender}"`;
        db.query(senderQuery, function(error, data){
            if(data){
                senderName = data[0].name;
                var message = {
                    to: '/topics/'.concat(payLoad.topic),
                    notification:{
                        title: senderName,
                        sender: payLoad.sender,
                        text: payLoad.msg,
                        click_action: "OPEN_ACTIVITY_1"
                    },
                    data:{
                        type: payLoad.type,
                        sender: payLoad.sender,
                        senderName: senderName,
                        msg: payLoad.msg,
                        url: payLoad.url,
                        msgId: payLoad.msgId,
                        createdAt: payLoad.createdAt
                    }
                };
                fcm.send(message, function(err, response){
                    return res.send({ response, success: err });
                });
        
                //const query = `select * from users where phone like "%${payLoad.phone}"`;
                const query = `insert into topics values(null, "${payLoad.topic}") on duplicate key update name = "${payLoad.topic}"`;
                db.query(query, function(error, data){
                });
        
                var url;
                if(payLoad.url){
                    url = payLoad.url;
                }else{
                    url = null;
                }
                const queryMsg = `insert into msg values(
                    null,
                    (select id from users where phone = "${payLoad.sender}"),
                    "${payLoad.msg}",
                    "${url}",
                    (select id from topics where name = "${payLoad.topic}"),
                    "${payLoad.msgId}",
                    "${payLoad.type}",
                    ${payLoad.createdAt},
                    now()
                )`;
        
                db.query(queryMsg, function(err, data){
                    
                });
            }
        });

        
    },
    getTorrent: function(req, res){
        const payLoad = req.body;
        var magnet = payLoad.magnet;
        magnetToTorrent.getLink(magnet)
            .then( function(torrentLink){
                res.send(torrentLink);
                console.log(torrentLink); // torrent url as string
            })
            .catch(function(error){
                res.send(error);
                console.error(error); // couldn't get a valid link
            });
        
    },
    history: function(req, res){
        
        const payLoad = req.body;
        var query;

        if(payLoad.id == 0){
            query = `SELECT msg.*, users.name, users.phone FROM msg 
            join users
            on sender_id = users.id
            WHERE msg.id <=
            (SELECT max(id) FROM msg)
            and
            topics_id = (select id from topics where name = "${payLoad.topic}")
            order by msg.id desc
            LIMIT 100`;
        }else{
            query = `SELECT msg.*, users.name, users.phone FROM msg 
            join users
            on sender_id = users.id
            WHERE msg.id < 
            ${payLoad.id}
            and
            topics_id = (select id from topics where name = "${payLoad.topic}")
            order by msg.id desc
            LIMIT 100`;
        }
        db.query(query, function(err, data){
            if(err){
                res.send(err);
            }else{
                res.send(data);
            }
        });
    },
    sendCall: function(req, res){
        const payLoad = req.body;
        const query = `SELECT token from users where phone = "${payLoad.receiver}"`;
        db.query(query, function(err, data){
            if(err){
                res.send({success: false, msg: "user not found"});
            }else{
                var message = {
                    to: data[0].token,
                    data:{
                        type: payLoad.type,
                        sender: payLoad.sender,
                        callId: payLoad.callId,
                        sdp: payLoad.sdp,
                        createdAt: payLoad.createdAt
                    },
                    priority: "high",
                    time_to_live: 60
                };
                fcm.send(message, function(err, response){
                    return res.send({ response, success: err });
                });
            }
        });
        
    },
    sendAns: function(req, res){
        const payLoad = req.body;
        const query = `SELECT token from users where phone = "${payLoad.receiver}"`;
        db.query(query, function(err, data){
            if(err){
                res.send({success: false, msg: "user not found"});
            }else{
                var message = {
                    to: data[0].token,
                    data:{
                        type: payLoad.type,
                        sender: payLoad.sender,
                        callId: payLoad.callId,
                        sdp: payLoad.sdp,
                        webRtcType: payLoad.webRtcType
                    }
                };
                fcm.send(message, function(err, response){
                    return res.send({ response, success: err });
                });
            }
        });
        
    },
    sendCandi: function(req, res){
        const payLoad = req.body;
        const query = `SELECT token from users where phone = "${payLoad.receiver}"`;
        db.query(query, function(err, data){
            if(err){
                res.send({success: false, msg: "user not found"});
            }else{
                var message = {
                    to: data[0].token,
                    data:{
                        type: payLoad.type,
                        sender: payLoad.sender,
                        callId: payLoad.callId,
                        sdp: payLoad.sdp,
                        id: payLoad.id,
                        label: payLoad.label,
                        candidate:payLoad.candidate
                    }
                };
                fcm.send(message, function(err, response){
                    return res.send({ response, success: err });
                });
            }
        });
        
    }
}