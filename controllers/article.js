const con = require('../utils/db');

const getAllarticle = (req, res) => {
    let query = "SELECT * FROM article";
    con.query(query, (err, result) => {
        if (err) throw err;
        res.render('index', {
            article: result
        });
    });
};

const getArticleBySlug = (req, res) => {
    let query = `
        SELECT article.*, 
               article.name AS article_name, 
               author.name AS author_name
        FROM article
        INNER JOIN author ON author.id = article.author_id 
        WHERE article.slug = ?`;
    
    con.query(query, [req.params.slug], (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(404).send('Article not found');
        }
        res.render('article', {
            article: result[0]
        });
    });
};

module.exports = {
    getAllarticle,
    getArticleBySlug
};