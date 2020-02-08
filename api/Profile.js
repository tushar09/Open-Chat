var db = require('../src/db/connector');

module.exports = {
    create: function (req, res) {
     try {
         //variii
         const payload = req.body;
         var query = `insert into users values(null, 
            "${payload.name}", 
            "${payload.email}", 
            "${payload.phone.toString()}", 
            null, 
            "${payload.token.toString()}", 
            now(), 
            now())
            on duplicate key update
            token = "${payload.token.toString()}",
            updated_at = now()`;
         console.log(query);
         db.query(query, function (error, data) {
             if(error){
                 console.log(error);
                 return res.send({ msg: error, success: false });
             }
             if (data == null) {
                return res.send({ msg: "account not created", success: false });
             } else {
                var query = `select * from users where phone = ${payload.phone.toString()}`;
                 db.query(query, function(error, data){
                    return res.send({ msg: query, success: true, user:data[0]});
                 });
                
             }

         });
     } catch(e) {
        console.log(e)
     }
    },
    update: function (req, res) {

    },
    login: function(req, res) {
        const payload = req.body;
        var query = `select email from users where email = "${payload.email}"`;
        console.log(query);
        db.query(query, function(error, data) {
            if(error){
                return res.send({ msg: "Account not found", success: false });
            }else {
                return res.send({ msg: "Logged in successfully", success: true });
            }
        })
    },
    users: function(req, res) {
        const payLoad = req.body;
        const query = `select * from users where email <> "${payLoad.email}"`;
        db.query(query, function(error, data) {
            if(error){
                return res.send({ msg: "No users found", success: false });
            }else {
                return res.send(data);
            }
        })
    },
    checkUser: function(req, res){
        const payLoad = req.body;
        //SELECT * FROM `users` WHERE LIKE +8801670983121;
        const query = `select * from users where phone like "%${payLoad.phone}"`;
        db.query(query, function(error, data) {
            if(error){
                return res.send({ msg: "No users found", success: false });
            }else {
                return res.send(data);
            }
        });
    },
    msg: function(req, res) {
        const payLoad = req.body;
        const query = `SELECT * FROM msg JOIN users on msg.sender_id = users.id 
        WHERE msg.sender_id = (select id from users where email = "${payLoad.email}") 
        OR msg.receiver_id = (select id from users where email = "${payLoad.receiverEmail}") 
        or msg.sender_id = (select id from users where email = "${payLoad.receiverEmail}")  
        OR msg.receiver_id = (select id from users where email = "${payLoad.email}")
        order by msg.id`;
        console.log(query);
        db.query(query, function(error, data) {
            if(error){
                return res.send({ msg: "No users found", success: false });
            }else {
                return res.send(data);
            }
        })
    }

}