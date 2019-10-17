var db = require('../src/db/connector');
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
                socket.to([data[0].socket_id]).emit('msg', msg.text);
            })

        });
        socket.on('userInfo', function(obj) {
            user = JSON.parse(obj);
            const query = `UPDATE users SET socket_id = "${socket.id}", updated_at = now() WHERE email = "${user.email}"`;
            console.log(query);
            db.query(query);
            console.log(user);
        });
        socket.on('disconnect', function(s) {
            //const query = `UPDATE users SET socket_id = null, updated_at = now() WHERE email = "(select email form user where socket_id = "${socket.id}"))"`;
            const query = `UPDATE users SET socket_id = null, updated_at = now() WHERE socket_id = "${socket.id}"`;
            db.query(query);
            console.log("asdf" + socket.id);
        });
    });
}