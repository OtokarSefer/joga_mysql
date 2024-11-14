// controllers/articleController.js

const db = require('../utils/db');

exports.getAllarticle = (req, res) => {
    const query = 'SELECT * FROM article';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.render('index', { article: results });
    });
};

exports.getArticleBySlug = (req, res) => {
    const slug = req.params.slug;
    const query = `
        SELECT article.*, author.name AS author_name 
        FROM article 
        LEFT JOIN author ON article.author_id = author.id 
        WHERE article.slug = ?
    `;
    db.query(query, [slug], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.render('article', { article: result[0] });
        } else {
            res.status(404).send('Article not found');
        }
    });
};
