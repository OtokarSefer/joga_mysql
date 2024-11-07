const express = require("express")
const path = require("path")
const mysql = require("mysql2")
const bodyParser = require("body-paraser")

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

cosnt con = mysql .createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    dataset: "joga_mysql"
})

con.connect((err) => {
    if(err) throw err;
    console.log("connection to joga_mysql db")
})

app.listen(3003, () => {
    console.log("server is running on port http://localhost:3003")
})