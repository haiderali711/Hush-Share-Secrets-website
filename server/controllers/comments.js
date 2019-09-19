const Comment = require('../models/Comment');

const getAllComments = (req, res) => {
  Comment.find()
    .select('-__v')
    .exec()
    .then(docs => {
      if (!docs.length) throw 404;

      res.status(200).json({
        count: docs.length,
        comments: docs.map(doc => doc)
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
  const comment = new Comment(req.body);

  comment
    .save()
    .then(result => {
      res.status(201).json(result);
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
    .select('-__v')
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'Comment updated.',
        ...result._doc
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Comment with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

const deleteComments = (req, res) => {
  Comment.deleteMany()
    .select('-__v')
    .exec()
    .then(result => {
      if (result.deletedCount === 0) throw 404;

      res.status(200).json({
        message: 'All Comments deleted.',
        deletedCount: result.deletedCount,
        request: {
          type: 'COMMENT',
          url: 'http://localhost:3000/api/comments',
          data: {}
        }
      });
    })
    .catch(error => {
      if (error === 404) res.status(404).json({ error: 'Comments not found.' });
      else res.status(500).json({ error: error });
    });
};

const deleteCommentWithId = (req, res) => {
  const id = req.params.id;

  Comment.findOneAndDelete({ _id: id })
    .select('-__v')
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'Comment deleted.',
        ...result._doc,
        request: {
          type: 'COMMENT',
          url: 'http://localhost:3000/api/comments',
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
  updateCommentById,
  deleteComments,
  deleteCommentWithId
};
