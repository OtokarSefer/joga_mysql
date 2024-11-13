const express = require("express");
const app = express();
const path = require("path");
const hbs = require('express-handlebars');
const bodyParser = require("body-parser");
const mysql = require("mysql2");

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutDir: __dirname + '/views/layouts/'
}));

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_mysql" // Corrected from "dataset" to "database"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to joga_mysql database");
});

// Routes
const articleRoutes = require('./routes/article');
app.use('/', articleRoutes);
app.use('/article', articleRoutes);

// Route for author details
app.get("/author/:author_id", (req, res) => {
    let query = `SELECT * FROM author WHERE id="${req.params.author_id}"`;
    let articles;
    
    con.query(query, (err, result) => { 
        if (err) throw err;
        articles = result;

        // Fetch author information
        query = `SELECT * FROM author WHERE id="${req.params.author_id}"`;
        con.query(query, (err, result) => {
            if (err) throw err;
            const author = result;
            
            // Render author page with data
            res.render('author', {
                author: author,
                articles: articles
            });
        });
    });
});

// Route for article by slug
app.get("/article/:slug", (req, res) => {
    let query = `
        SELECT article.*, 
               article.name AS article_name, 
               author.name AS author_name
        FROM article
        INNER JOIN author ON author.id = article.author_id 
        WHERE article.slug = "${req.params.slug}"`;
    
    con.query(query, (err, result) => {
        if (err) throw err;
        const article = result;

        // Render article page with data
        res.render('article', {
            article: article
        });
    });
});

// Start server
app.listen(3003, () => {
    console.log("Server is running on http://localhost:3003");
});
