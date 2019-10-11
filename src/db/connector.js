
/**
 * MySql Connection
 */
var mysql = require('mysql')
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root-root-wrqwer',
    database: 'open_chat'
})