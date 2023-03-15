const express = require('express');
const tagController = require('../controllers/tagController');

const router = express.Router();

router.post('/', tagController.createTag);

module.exports = router;
