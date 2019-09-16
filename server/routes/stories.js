const express = require('express');
const router = express.Router();

const StoriesController = require('../controllers/stories');

router.get('/', StoriesController.getAllStories);

router.get('/:id', StoriesController.getStoryWithId);

router.post('/', StoriesController.createNewStory);

router.delete('/', StoriesController.deleteStories);

router.delete('/:id', StoriesController.deleteStoryWithId);

router.patch('/:id', StoriesController.updateStoryById);

module.exports = router;
