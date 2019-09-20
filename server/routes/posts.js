const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts');

router.get('/', PostsController.getAllPosts);

router.get('/:id', PostsController.getPostWithId);

router.post('/', PostsController.createPost);

router.put('/:id', PostsController.putPostWithId);

router.patch('/:id', PostsController.patchPostWithId);

router.delete('/', PostsController.deleteAllPosts);

router.delete('/:id', PostsController.deletePostWithId);

router.get('/:id/comments', PostsController.getAllCommentsWithPostId);

router.get(
  '/:id/comments/:commentId',
  PostsController.getPostCommentWithPostId
);

router.post('/:id/comments', PostsController.createPostComment);

router.delete(
  '/:id/comments/:commentId',
  PostsController.deletePostCommentWithId
);

module.exports = router;
