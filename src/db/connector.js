
/**
 * MySql Connection
 */
var mysql = require('mysql')
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'rootqwer',
    database: 'open_chat'
})