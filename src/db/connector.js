
/**
 * MySql Connection
 */
var mysql = require('mysql')
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root_root',
    database: 'open_chat'
})