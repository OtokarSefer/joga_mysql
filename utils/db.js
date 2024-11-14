const mysql = require('mysql2')
// Mysql2 because it works for me

const con =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to joga_mysql database");
});


module.exports = con;