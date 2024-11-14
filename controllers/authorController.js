// controllers/authorController.js

const db = require('../utils/db');

exports.AuthorsID = (req, res) => {
    const authorId = req.params.id;
    const query = 'SELECT * FROM author WHERE id = ?';
    const articleQuery = 'SELECT * FROM article WHERE author_id = ?';

    db.query(query, [authorId], (err, authorResult) => {
        if (err) throw err;
        if (authorResult.length > 0) {
            db.query(articleQuery, [authorId], (err, articleResult) => {
                if (err) throw err;
                res.render('author', {
                    author: authorResult[0],
                    article: articleResult
                });
            });
        } else {
            res.status(404).send('Author not found');
        }
    });
};
