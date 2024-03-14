const mysql = require('../config/config.dev');
function executeQuery(query, callbackFunction, params){
    mysql.connect();
    mysql.query(query, params, (err, rows) => callbackFunction(err, rows));
    mysql.end();
}

module.exports = executeQuery;