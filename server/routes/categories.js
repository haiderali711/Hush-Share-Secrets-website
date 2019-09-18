const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/categories');

router.post('/secret/:post', CategoryController.newCategoryForSecret);

router.get('/sec/cat/:category', CategoryController.getSecretByCat);
router.get('/sto/cat/:category', CategoryController.getStoryByCat);

//
router.post('/story/:story', CategoryController.newCategoryForStory);

module.exports = router;
