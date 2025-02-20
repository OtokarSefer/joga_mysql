
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('express-handlebars');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
}));

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }));

// Importing routes
const ArticleRoutes = require('./routes/article');
const AuthorRoutes = require('./routes/authorRoutes');

// Using the routes
app.use('/', ArticleRoutes);
app.use('/article', ArticleRoutes)
app.use('/author', AuthorRoutes);

const port = 3007;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

