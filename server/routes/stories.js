const express = require('express');
const router = express.Router();

const StoriesController = require('../controllers/stories');

router.get('/', StoriesController.getAllStories);

router.get('/:id', StoriesController.getStoryWithId);

router.post('/', StoriesController.createNewStory);

router.delete('/', StoriesController.deleteStories);

router.delete('/:id', StoriesController.deleteStoryWithId);

router.put('/:id', StoriesController.putStoryWithId);

router.patch('/:id', StoriesController.updateStoryById);

router.get('/:id/user', StoriesController.getUserWithStoryId);

module.exports = router;
