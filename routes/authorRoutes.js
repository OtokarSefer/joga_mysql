const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

router.get('/:id', authorController.AuthorsID);

module.exports = router;
