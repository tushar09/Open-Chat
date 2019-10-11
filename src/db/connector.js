
/**
 * MySql Connection
 */
var mysql = require('mysql')
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'rootsadf',
    database: 'open_chat'
})