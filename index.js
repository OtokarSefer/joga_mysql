const express = require("express")
const app = express()
const path = require("path")
const hbs = require('path');
const hbs = require('express-handlebars');
app.set('views engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultLayout: 'main',
    layoutDir: __dirname+'/views/layouts/'
}))

app.use(express.static('public'));

const mysql = require("mysql")

const bodyParser = require("body-paraser")
app.use(bodyParser.urlencoded({extended: true}))

var con = mysql .createConnection({
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