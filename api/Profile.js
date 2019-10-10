var db = require('../src/db/connector');
module.exports = {
    create: function (req, res) {
        //var //
        const payload = req.body;
        var query = `insert into users values(null, "${payload.name}", "${payload.email}", "${payload.phone.toString()}", null, null, now(), now())`;
        db.query(query, function (error, data) {
            return res.send({ data: data, error });
        });

    },
    update: function (req, res) {

    }
}