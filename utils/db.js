const mysql = require('mysql');
const db = mysql.createConnection({
    hhost: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to your joga_mysql database :V")
})

module.exports = con