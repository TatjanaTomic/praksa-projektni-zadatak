var mysql = require('mysql');

const HOST = 'localhost'
const USERNAME = 'root';
const PASSWORD = 'root';
const database = 'mydb';

var pool = mysql.createPool({
    connectionLimit : 10,
    host: HOST,
    user: USERNAME,
    password: PASSWORD,
    database: database
})

exports.sendQuery = (queryString, callback) => {
    pool.query(queryString, (error, result, fields) => {
        if(error) throw(error);
        return callback(result);
    })
}

exports.pool = pool;