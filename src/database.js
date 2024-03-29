const mysql = require ('mysql');
const { promisify } = require('util');
const env = process.env.NODE_ENV || 'test';
const config = require(__dirname + '/../config/config.json')[env];
// const { database } = require('./keys');

const pool = mysql.createPool(env);

pool.getConnection((err, connection) => {
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS MANY CONNECTION');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB is Connected');
    return;
});

//Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;