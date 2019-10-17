const Post = require('../models/Post');
const Comment = require('../models/Comment');

/** Returns all the Posts from the database. Posts are returned
 * in particular format as can be seen in response code.
 *
 * end-point:       /api/posts
 * response-status: 200, if more than 0 Posts were found.
 * throws:          404, if no Posts were found.
 *                  500, if internal server error.
 */
const getAllPosts = (req, res) => {
  const options = {
    // for sorting see: https://github.com/aravindnc/mongoose-paginate-v2/issues/15
    sort: { published: -1 },
    page: req.query.page === 'undefined' ? 1 : req.query.page,
    limit:
      typeof req.query.limit === 'undefined' || req.query.limit === 'undefined'
        ? 9
        : req.query.limit
  };

  Post.paginate({}, options)
    .then(result => {
      if (!result.totalDocs) throw 404;

      res.status(200).json({
        ...result
      });
    })
    .catch(error => {
      if (error === 404) res.status(404).json({ error: 'No posts found.' });
      else res.status(500).json({ error: error });
    });
};

/** Returns a Post with a given ID from the database. Post is returned
 * in particular format as can be seen in the code below.
 *
 * end-point:       /api/posts/:id
 * response-status: 200, if the Post with given ID was found.
 * throws:          404, if no Post with the given ID was found.
 *                  500, if internal server error.
 */
const getPostWithId = (req, res) => {
  const id = req.params.id;

  Post.findById(id)
    .select('-__v')
    .exec()
    .then(doc => {
      if (!doc) throw 404;

      res.status(200).json(doc);
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Post with Id:${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

/** Creates a new Post with given data from the request and returns it.
 *  Post is returned in particular format as can be seen in response code.
 *
 * end-point:       /api/posts
 * response-status: 201, if the Post was created successfully.
 * throws:          500, if internal server error.
 */
const createPost = (req, res) => {
  req.body.group = req.body.group ? req.body.group : '';
  const post = new Post(req.body);

  post
    .save()
    .then(result => {
      res.status(201).json({
        _id: result._id,
        content: result.content,
        user: result.user,
        published: result.published,
        likes: result.likes,
        dislikes: result.dislikes,
        category: result.category,
        group: result.group
      });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

/** Replaces a Post with a given ID.
 *
 * end-point:       /api/posts/:id
 * response-status: 200, if the Post was replaced successfully.
 * throws:          404, if no Post with given ID was found.
 *                  500, if internal server error.
 */
const putPostWithId = (req, res) => {
  const id = req.params.id;

  Post.findOneAndReplace({ _id: id }, req.body, { new: true })
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'Post replaced.',
        ...result._doc
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Post with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

/** Partially updates a Post with a given ID. Updated Post is returned
 * in particular format as can be seen in response code.
 *
 * end-point:       /api/posts/:id
 * response-status: 200, if the Post was updated successfully.
 * throws:          404, if no Post with given ID was found.
 *                  500, if internal server error.
 */
const patchPostWithId = (req, res) => {
  const id = req.params.id;

  Post.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'Post updated.',
        ...result._doc
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Post with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

/** Deletes all the Posts from the database. A 'message' and
 *  'deletedCount' is returned as a response.
 *
 * end-point:       /api/posts
 * response-status: 200, if all the Posts were deleted successfully.
 *                  Although we should have used '204' as response code,
 *                  we decided not to use that since it returns no response body.
 * throws:          404, if no Posts were found.
 *                  500, if internal server error.
 */
const deleteAllPosts = (req, res) => {
  Post.deleteMany()
    .exec()
    .then(result => {
      if (result.deletedCount === 0) throw 404;

      res.status(200).json({
        message: 'All Posts deleted.',
        deletedCount: result.deletedCount,
        request: {
          type: 'POST',
          url: 'http://localhost:3000/api/posts',
          data: {
            content: 'String',
            user: 'User',
            published: 'Date',
            reactions: {
              likes: 'Number',
              dislikes: 'Number'
            },
            category: 'String'
          }
        }
      });
    })
    .catch(error => {
      if (error === 404) res.status(404).json({ error: 'No Posts found.' });
      else res.status(500).json({ error: error });
    });
};

/** Deletes a Post with a given ID from the database. Deleted Post is returned
 * in particular format as can be seen in the code below.
 *
 * end-point:       /api/posts/:id
 * response-status: 200, if the Post with given ID was found.
 * throws:          404, if no Post with the given ID was found.
 *                  500, if internal server error.
 */
const deletePostWithId = (req, res) => {
  const id = req.params.id;

  Post.findOneAndDelete({ _id: id })
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'Post deleted.',
        ...result._doc,
        request: {
          type: 'POST',
          url: 'http://localhost:3000/api/posts',
          data: {
            content: 'String',
            user: 'User',
            published: 'Date',
            reactions: {
              likes: 'Number',
              dislikes: 'Number'
            },
            category: 'String'
          }
        }
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Post with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

/** Returns all the comments for the Post with a given ID from the database.
 *
 * end-point:       /api/posts/:id/comments
 * response-status: 200, if the Post with given ID was found
 *                  and the Post has more than 0 comments.
 * throws:          404, if no Post with the given ID was found.
 *                  500, if internal server error.
 */
const getAllCommentsWithPostId = (req, res) => {
  const id = req.params.id;
  const countBool = req.query.count;

  const fields = {};
  let fieldsArray = req.query.fields ? req.query.fields.split(',') : [];
  fieldsArray.map(field => {
    fields[field] = 1;
  });

  Comment.find({ post: { $eq: id } }, Object.keys(fields).length ? fields : '')
    .populate('user', '-__v')
    .exec()
    .then(docs => {
      if (docs.length === 0) throw 404;

      const response = {};
      if (countBool) response.count = docs.length;
      else {
        response.comments = docs.map(comment => {
          return {
            _id: comment._id,
            content: comment.content,
            post: comment.post,
            published: comment.published,
            user: comment.user.username
            // user: {
            //   _id: comment.user._id,
            //   username: comment.user.username
            // }
          };
        });
      }

      res.status(200).json({
        ...response
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({
          error: `No Comments found associated with Post Id:${id}`
        });
      else res.status(500).json({ error: error });
    });
};

/** Returns a Comment associated with the Post with a given ID from the database.
 *
 * end-point:       /api/posts/:id/comments/:commentID
 * response-status: 200, if the Post with given ID was found
 *                  and the Post has a comment with commentId.
 * throws:          404, if no Post with the given ID was found
 *                  or the comment with commentId was not found.
 *                  500, if internal server error.
 */
const getPostCommentWithPostId = (req, res) => {
  const commentId = req.params.commentId;

  Comment.findById(commentId)
    .select('-__v')
    .exec()
    .then(doc => {
      if (!doc) throw 404;

      res.status(200).json({
        _id: doc._id,
        content: doc.content,
        post: doc.post,
        user: {
          _id: doc.user._id,
          username: doc.user.username
        },
        published: doc.published
      });
    })
    .catch(error => {
      if (error === 404)
        res
          .status(404)
          .json({ error: `Comment with Id:${commentId} not found.` });
      else
        res.status(500).json({
          message: error.message,
          kind: error.kind
        });
    });
};

/** Creates a new Comment associated with a given Post from data from the request and returns it.
 *  Post is returned in particular format as can be seen in response code.
 *
 *  If the Post with given postId doesn't exist in the databses '404' is returned.
 *
 * end-point:       /api/posts/:id/comments
 * response-status: 201, if the Post was created successfully.
 * throws:          500, if internal server error.
 */
const createPostComment = (req, res) => {
  const postId = req.params.id;

  // see if we have a post with the postId
  Post.findById(postId)
    .then(post => {
      if (!post) throw 404;

      const comment = new Comment({
        ...req.body,
        post: postId
      });

      // since we have a post we save a comment
      return comment.save();
    })
    .then(result => {
      res.status(201).json({
        _id: result._id,
        content: result.content,
        post: result.post,
        user: result.user,
        published: result.published
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ message: `Post with ID:${postId} not found.` });
      else res.status(500).json({ error: error });
    });
};

/** Deletes a Comment associated with a given Post with given commentID.
 *
 * end-point:       /api/posts/:id/comments/:commentId
 * response-status: 200, if the Comment was deleted successfully.
 * throws:          500, if internal server error.
 */
const deletePostCommentWithId = (req, res) => {
  const commentId = req.params.commentId;

  Comment.findOneAndDelete({ _id: commentId })
    .select('-__v')
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'Comment deleted.',
        ...result._doc
      });
    })
    .catch(error => {
      if (error === 404)
        res
          .status(404)
          .json({ error: `Comment with Id: ${commentId} not found.` });
      else res.status(500).json({ error: error });
    });
};

module.exports = {
  getAllPosts,
  getPostWithId,
  createPost,
  putPostWithId,
  patchPostWithId,
  deleteAllPosts,
  deletePostWithId,
  getAllCommentsWithPostId,
  getPostCommentWithPostId,
  createPostComment,
  deletePostCommentWithId
};
