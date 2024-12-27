const mysql2 = require('mysql2');


const connection = mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
})

module.exports = connection