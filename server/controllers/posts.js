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
  let filter = 0;
  if (Object.entries(req.query).length === 1) {
    if (req.query.des === 'true') filter = -1;
    if (req.query.asc === 'true') filter = 1;
  }

  Post.find()
    .sort({ _id: filter })
    .select('-__v')
    .exec()
    .then(docs => {
      if (!docs.length) throw 404;

      res.status(200).json({
        count: docs.length,
        posts: docs.map(doc => {
          return {
            _id: doc._id,
            content: doc.content,
            user: doc.user,
            published: doc.published,
            likes: doc.likes,
            dislikes: doc.dislikes,
            category: doc.category,
            group: doc.group
          };
        })
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
    .select()
    .populate('user')
    .exec()
    .then(doc => {
      if (!doc) throw 404;

      res.status(200).json({
        _id: doc._id,
        content: doc.content,
        user: doc.user,
        published: doc.published,
        likes: doc.likes,
        dislikes: doc.dislikes,
        category: doc.category,
        group: doc.group
      });
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

const putPostWithId = (req, res) => {
  const id = req.params.id;
  const post = new Post(req.body);

  Post.findOneAndReplace({ _id: id }, { post }, { new: true })
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
        _id: result._id,
        content: result.content,
        user: result.user,
        published: result.published,
        likes: result.likes,
        dislikes: result.dislikes,
        category: result.category,
        group: result.group,
        request: [
          {
            type: 'GET',
            url: `http://localhost:3000/posts/${id}`
          },
          {
            type: 'GET',
            url: 'http://localhost:3000/api/posts'
          }
        ]
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
 *                  Although we should have user '204' as response code,
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
        // todo should we return the deleted post? See deleteAllPosts
        //  adjust the comments accordingly
        _id: result._id,
        content: result.content,
        user: result.user,
        published: result.published,
        likes: result.likes,
        dislikes: result.dislikes,
        category: result.category,
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

  Comment.find({ post: { $eq: id } })
    .select('-__v')
    .populate('user', '-__v')
    .exec()
    .then(docs => {
      // todo see if this returns 404 for both if the postId is not found and if the comments are 0
      //  adjust the comments accordingly
      if (docs.length === 0) throw 404;

      res.status(200).json({
        count: docs.length,
        comments: docs.map(doc => doc._doc)
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

/** Returns all the comments for the Post with a given ID from the database.
 *
 * end-point:       /api/posts/:id/comments
 * response-status: 200, if the Post with given ID was found
 *                  and the Post has more than 0 comments.
 * throws:          404, if no Post with the given ID was found.
 *                  500, if internal server error.
 */
const getPostCommentWithId = (req, res) => {
  const commentId = req.params.commentId;

  Comment.findById(commentId)
    .select('-__v')
    .exec()
    .then(doc => {
      if (!doc) throw 404;

      res.status(200).json(doc);
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

const createPostComment = (req, res) => {
  const postId = req.params.id;

  const comment = new Comment({
    content: req.body.content,
    user: req.body.user,
    post: postId
  });

  comment
    .save()
    .then(result => {
      res.status(200).json({
        _id: result._id,
        content: result.content,
        user: result.user,
        post: result.post
      });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

const deletePostCommentWithId = (req, res) => {
  const commentId = req.params.commentId;

  Comment.findOneAndDelete({ _id: commentId })
    .select('-__v')
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'Comment deleted.',
        comment: result
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
  getPostCommentWithId,
  createPostComment,
  deletePostCommentWithId
};
