module.exports = function(io) {
    const con = io.of('/con');
    con.on('connection', function(socket) {
        console.log('user connected' + socket.id);
        socket.on('disconnect', function(s) {
            console.log("asdf" + socket.id);
        });
    });
}