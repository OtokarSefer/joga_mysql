const express = require("express")
const app = express();

const path = require("path");
const hbs = require('express-handlebars');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultLayout: 'main',
    layoutDir: __dirname+'/views/layouts/'
}));

app.use(express.static('public'));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const mysql = require("mysql2");
var con = mysql .createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    dataset: "joga_mysql"
});
con.connect((err) => {
    if(err) throw err;
    console.log("connection to joga_mysql db")
});

const articleRoutes = require('./routes/article');
app.use('/', articleRoutes);
app.use('/article', articleRoutes)

app.get("/author/:author_id", (req, res) => {
    let query = `SELECT * FROM author WHERE id ="$(req.params.author_id)"`
    let articles
    con.query = (query, (err, result) => {
        if (err) throw err;
        articles = result
        console.log(articles)
        query = `SELECT * FROM author WHERE id="${req.params.author_id}"`
        let author
        con.query(query, (err, result) => {
            if (err) throw err;
            author = result
            console.log('autor', {
                author: author,
                articles: articles
            })
        })        
    })
})

app.get("/article/slug", (req, res) => {
    let query = `SELECT *
    article.name as article_name,
    author.name as author_name
    FROM article
    INNER JOIN author
    ON author.id = article.author_id WHERE slugs="${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        console.log(article)
        res.render('article', {
            article: article
        })
    });
});

app.listen(3003, () => {
    console.log("server is running on port http://localhost:3003")
});