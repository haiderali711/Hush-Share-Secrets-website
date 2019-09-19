const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments');

router.get('/', CommentsController.getAllComments);

router.get('/:id', CommentsController.getCommentWithId);

router.post('/', CommentsController.createNewComment);

router.patch('/:id', CommentsController.updateCommentById);

router.delete('/', CommentsController.deleteComments);

router.delete('/:id', CommentsController.deleteCommentWithId);

module.exports = router;
