var db = require('../src/db/connector');
module.exports = {
    create: function (req, res) {
        //vari
        const payload = req.body;
        var query = `insert into users values(null, "${payload.name}", "${payload.email}", "${payload.phone.toString()}", null, null, now(), now())`;
        db.query(query, function (error, data) {
            if (data == null) {
                return res.send({ error: "not created" });
            } else {
                var passwordQuery = `insert into password values(null, "${data.insertId}", "${payload.pass}")`;
                db.query(passwordQuery, function (error, data) {
                    if (data != null) {
                        return res.send({ success: true });
                    } else {
                        return res.send({ error: "not created" });
                    }
                })

            }

        });

    },
    update: function (req, res) {

    }
}