const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/categories');

router.get('/', CategoryController.getAllCategory);
router.get('/:category', CategoryController.getCategory);
router.get('/posts/:postId', CategoryController.getCategoriesWithPostId);
router.post('/', CategoryController.createCategory);
router.patch('/secret/', CategoryController.addSecretToCategory);
router.patch('/story/', CategoryController.addStoryToCategory);
router.delete('/', CategoryController.deleteAllCategories);

module.exports = router;
