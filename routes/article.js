const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
router.get('/', artucleController.getAllArtticles);
router.get('/article/:slug', articleController.getArtcleBySlug);

module.exports = router;