const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router.get('/', articleController.getAllarticle);
router.get('/:slug', articleController.getArticleBySlug);

module.exports = router;
