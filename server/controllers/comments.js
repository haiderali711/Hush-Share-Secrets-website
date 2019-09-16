const mongoose = require('mongoose');

const Comment = require('../models/Comment');

const getAllComments = (req, res) => {
  Comment.find()
    .select('-__v')
    .exec()
    .then(docs => {
      if (!docs.length) throw 404;

      res.status(200).json({
        count: docs.length,
        comments: docs.map(doc => {
          return {
            doc: doc._doc
          };
        })
      });
    })
    .catch(error => {
      if (error === 404) res.status(404).json({ error: 'No Comments found.' });
      else res.status(500).json({ error: error });
    });
};

const getCommentWithId = (req, res) => {
  const id = req.params.id;
  Comment.findById(id)
    .select('-__v')
    .exec()
    .then(doc => {
      if (!doc) throw 404;

      res.status(200).json(doc);
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Comment with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

const createNewComment = (req, res) => {
  const comment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.content,
    user: req.body.user,
    post: req.body.post
  });

  comment
    .save()
    .then(result => {
      res.status(200).json({
        _id: result._id,
        content: result.content,
        user: result.user,
        post: result.post,
        published: result.published
      });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

const updateCommentById = (req, res) => {
  const id = req.params.id;

  Comment.findOneAndUpdate(
    { _id: id },
    { content: req.body.content },
    { new: true }
  )
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'Comment updated.',
        _id: result._id,
        content: result.content,
        user: result.user,
        post: result.post,
        published: result.published
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Comment with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

/*
//CHANGES ALL COMMENTS CONTENT
const replaceComment = (req, res) => {
    const comment=Comment.findOneAndUpdate({
      content:req.body.content,
      post: req.body.post
    })
    .exec()
    .then(doc => res.status(204).json(doc))
    .catch(error => {
      res.status(500).json({ error: error });
    })
};
*/

const deleteComments = (req, res) => {
  Comment.deleteMany()
    .exec()
    .then(result => {
      if (result.deletedCount === 0) throw 404;

      res.status(200).json({
        message: 'All Comments deleted.',
        deletedCount: result.deletedCount,
        request: {
          type: 'POST',
          url: 'http://localhost:3000/api/comments',
          data: {}
        }
      });
    })
    .catch(error => {
      if (error === 404) res.status(404).json({ error: 'No Comments found.' });
      else res.status(500).json({ error: error });
    });
};

const deleteCommentWithId = (req, res) => {
  const id = req.params.id;
  Comment.findOneAndDelete({ _id: id })
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'Comment deleted.',
        comment: {
          _id: result._id,
          content: result.content,
          user: result.user,
          post: result.post,
          published: result.published
        },
        request: {
          type: 'POST',
          url: 'http://localhost:3000/api/posts',
          data: {}
        }
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Comment with Id:${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

module.exports = {
  getAllComments,
  getCommentWithId,
  createNewComment,
  //  replaceComment,
  updateCommentById,
  deleteComments,
  deleteCommentWithId
};
