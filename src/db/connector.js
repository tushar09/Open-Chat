
/**
 * MySql Connection
 */
var mysql = require('mysql');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'open_chat'
});