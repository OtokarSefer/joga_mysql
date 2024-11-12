const getAllArtticles = (req, res => {
    let query = "SELECT * FROM article";
    let article = []
    confirm.query(query, (err, result) => {
        if (err) throw err;
        article = result
        res.render('index', {
            articles: articles
        })
    })
});

const getArticleBySlug = (req, res) => {
    let query = `SELECT *,
    article.name as article_name,
    author.name as author_name
    FROM article
    INNER JOIN author
    ON authot.id = article.author_id WHERE slug="${req.params.slug}"`
    let article
    confirm.query(query, (err, result) => {
        if (err) throw err;
        article = result
        console.log(article)
        res.render('article', {
            article: article
        })
    })
}

module.export = {
    getAllArtticles,
    getArticleBySlug
};