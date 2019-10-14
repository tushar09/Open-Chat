var db = require('../src/db/connector');
module.exports = {
    create: function (req, res) {
        //variii
        const payload = req.body;
        var query = `insert into users values(null, "${payload.name}", "${payload.email}", "${payload.phone.toString()}", null, now(), now())`;
        db.query(query, function (error, data) {
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

    },
    update: function (req, res) {

    }
}