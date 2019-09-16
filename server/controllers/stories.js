const mongoose = require('mongoose');
const Story = require('../models/Story');

const getAllStories = (req, res) => {
  Story.find()
    .select('-__v')
    .exec()
    .then(docs => {
      if (!docs.length) throw 404;

      res.status(200).json({
        count: docs.length,
        stories: docs.map(doc => {
          return {
            doc: doc._doc
          };
        })
      });
    })
    .catch(error => {
      if (error === 404) res.status(404).json({ error: 'No stories found.' });
      else res.status(500).json({ error: error });
    });
};

const getStoryWithId = (req, res) => {
  const id = req.params.id;
  Story.findById(id)
    .select('-__v')
    .exec()
    .then(doc => {
      if (!doc) throw 404;

      res.status(200).json(doc);
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Story with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

const createNewStory = (req, res) => {
  const story = new Story({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
    user: req.body.user
  });

  story
    .save()
    .then(result => {
      res.status(200).json({
        _id: result._id,
        title: result.title,
        content: result.content,
        user: result.user,
        published: result.published
      });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

const updateStoryById = (req, res) => {
  const id = req.params.id;

  Story.findOneAndUpdate(
    { _id: id },
    { content: req.body.content },
    { new: true }
  )
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'post updated.',
        _id: result._id,
        title: result.title,
        content: result.content,
        user: result.user,
        published: result.published
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `story with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

const deleteStories = (req, res) => {
  Story.deleteMany()
    .exec()
    .then(result => {
      if (result.deletedCount === 0) throw 404;

      res.status(200).json({
        message: 'All Stories deleted.',
        deletedCount: result.deletedCount,
        request: {
          type: 'STORY',
          url: 'http://localhost:3000/api/stories',
          data: {}
        }
      });
    })
    .catch(error => {
      if (error === 404) res.status(404).json({ error: 'No stories found.' });
      else res.status(500).json({ error: error });
    });
};

const deleteStoryWithId = (req, res) => {
  const id = req.params.id;
  Story.findOneAndDelete({ _id: id })
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'story deleted.',
        story: {
          _id: result._id,
          title: result.title,
          content: result.content,
          user: result.user,
          published: result.published
        },
        request: {
          type: 'STORY',
          url: 'http://localhost:3000/api/stories',
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
  getAllStories,
  getStoryWithId,
  createNewStory,
  updateStoryById,
  deleteStories,
  deleteStoryWithId
};
