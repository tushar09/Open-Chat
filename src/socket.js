var db = require('../src/db/connector');
module.exports = function(io) {
    const con = io.of('/con');
    let user;
    con.on('connection', function(socket) {
        console.log('user connected' + socket.id);
        socket.on('userInfo', function(obj) {
            user = JSON.parse(obj);
            const query = `UPDATE users SET socket_id = "${socket.id}" WHERE email = "${user.email}"`;
            console.log(query);
            db.query(query);
            console.log(user);
        });
        socket.on('disconnect', function(s) {
            const query = `UPDATE users SET socket_id = null WHERE email = "${user.email}"`;
            db.query(query);
            console.log("asdf" + socket.id);
        });
    });
}