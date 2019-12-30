var db = require('../src/db/connector');
const log = require('simple-node-logger').createSimpleFileLogger('project.log');;
module.exports = function(io) {
    const con = io.of('/con');
    let user;
    con.on('connection', function(socket) {
        console.log('user connected' + socket.id);
        socket.on('sendMsg', function(obj) {
            msg = JSON.parse(obj);
            const query = `insert into msg values(null, (select id from users where email = "${msg.senderEmail}"), "${msg.text}", (select id from users where email = "${msg.email}"), now(), now())`;
            console.log(query);
            db.query(query);

            const userSocket = `select socket_id from users where email = "${msg.email}"`;
            db.query(userSocket, function(error, data) {
                console.log(data[0].socket_id);
                const msgg = {text: msg.text, sender: msg.senderEmail};
                socket.to([data[0].socket_id]).emit('msg', msgg);
            })

        });
        socket.on('call', function(obj) {
            const callDto = JSON.parse(obj);
            const userSocket = `select socket_id from users where email = "${callDto.receiver}"`;
            console.log("Call " + userSocket);
            db.query(userSocket, function(error, data) {
                console.log(data[0].socket_id);
                //socket.to([data[0].socket_id]).emit('msg', msgg);
                callObj = {caller : callDto.caller, roomId: callDto.roomId};
                socket.to([data[0].socket_id]).emit('call', callObj);
            })
        });
        socket.on('callReceive', function(obj) {
            const callReceive = JSON.parse(obj);
            const userSocket = `select socket_id from users where email = "${callReceive.caller}"`;
            console.log("Call " + userSocket);
            db.query(userSocket, function(error, data) {
                socket.to([data[0].socket_id]).emit('callReceive', callObj);
            })
        });
        socket.on('userInfo', function(obj) {
            log.info('asdf');
            user = JSON.parse(obj);
            const query = `UPDATE users SET socket_id = "${socket.id}", updated_at = now() WHERE phone = "${user.phone}"`;
            //console.log(query);
            db.query(query);
            //console.log(user);
        });
        socket.on('disconnect', function(s) {
            //const query = `UPDATE users SET socket_id = null, updated_at = now() WHERE email = "(select email form user where socket_id = "${socket.id}"))"`;
            const query = `UPDATE users SET socket_id = null, updated_at = now() WHERE socket_id = "${socket.id}"`;
            db.query(query);
            console.log("asdf" + socket.id);
        });
    });
}