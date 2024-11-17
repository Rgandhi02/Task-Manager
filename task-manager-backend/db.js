const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
});

pool.promise().query("SELECT 1")
    .then(([rows]) => {
        console.log("Connected to MySQL!");
    })
    .catch(err => {
        console.error("Error connecting to MySQL:", err.message);
    });

module.exports = pool.promise();


