var db = require('../src/db/connector');

module.exports = {
    create: function (req, res) {
     try {
         //variii
         const payload = req.body;
         var query = `insert into users values(null, "${payload.name}", "${payload.email}", "${payload.phone.toString()}", null, now(), now())`;
         console.log(query);
         db.query(query, function (error, data) {
             if(error){
                 console.log(error);
                 return res.send({ msg: "account not created", success: false });
             }
             if (data == null) {
                 return res.send({ msg: "account not created", success: false });
             } else {
                 var passwordQuery = `insert into password values(null, "${data.insertId}", "${payload.pass}")`;
                 db.query(passwordQuery, function (error, data) {
                     if (data != null) {
                         return res.send({ msg: "account created successfully", success: true });
                     } else {
                         return res.send({ msg: "account not created", success: false });
                     }
                 })

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
        db.query(query, function(error, data) {
            if(error){
                return res.send({ msg: "Account not found", success: false });
            }else {
                return res.send({ msg: "Logged in successfully", success: true });
            }
        })
    }
}