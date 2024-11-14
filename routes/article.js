// routes/article.js

const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Ensure getAllarticle and getArticleBySlug exist in articleController
router.get('/', articleController.getAllarticle);
router.get('/:slug', articleController.getArticleBySlug);

module.exports = router;
