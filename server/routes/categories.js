const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/categories');

router.patch('/secret/', CategoryController.addSecretToCategory);
router.post('/new/:category', CategoryController.createCategory);
router.patch('/story/', CategoryController.addStoryToCategory);
router.get('/:category', CategoryController.getCategory);

module.exports = router;
