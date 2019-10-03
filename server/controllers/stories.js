const Story = require('../models/Story');
const getAllStories = (req, res) => {
  const options = {
    // for sorting see: https://github.com/aravindnc/mongoose-paginate-v2/issues/15
    sort: { published: -1 },
    page: req.query.page === 'undefined' ? 1 : req.query.page,
    limit:
      typeof req.query.limit === 'undefined' || req.query.limit === 'undefined'
        ? 9
        : req.query.limit
  };
  Story.paginate({}, options)
    .then(result => {
      if (!result.totalDocs) throw 404;
      res.status(200).json({
        ...result
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
    .populate('user')
    .exec()
    .then(doc => {
      if (!doc) throw 404;
      res.status(200).json({
        _id: doc._id,
        title: doc.title,
        content: doc.content,
        user: doc.user,
        published: doc.published,
        likes: doc.likes,
        dislikes: doc.dislikes,
        request: [
          {
            type: 'GET',
            url: 'http://localhost:3000/api/stories'
          },
          {
            type: 'GET',
            url: `http://localhost:3000/api/users/${doc.user}`
          }
        ]
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Story with Id:${id} not found.` });
      else res.status(500).json({ error: error });
    });
};
const createNewStory = (req, res) => {
  const story = new Story(req.body);
  story
    .save()
    .then(result => {
      res.status(201).json({
        _id: result._id,
        title: result.title,
        content: result.content,
        user: result.user,
        published: result.published,
        likes: result.likes,
        dislikes: result.dislikes,
        request: [
          {
            type: 'GET',
            url: 'http://localhost:3000/api/stpries'
          },
          {
            type: 'GET',
            url: `http://localhost:3000/api/users/${result.user}`
          }
        ]
      });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};
const putStoryWithId = (req, res) => {
  const id = req.params.id;
  Story.findOneAndReplace({ _id: id }, req.body, { new: true })
    .exec()
    .then(result => {
      if (!result) throw 404;
      res.status(200).json({
        message: 'Story replaced.',
        ...result._doc
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Story with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};
const updateStoryById = (req, res) => {
  const id = req.params.id;
  Story.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .exec()
    .then(result => {
      if (!result) throw 404;
      res.status(200).json({
        message: 'story updated.',
        _id: result._id,
        title: result.title,
        content: result.content,
        user: result.user,
        likes: result.likes,
        dislikes: result.dislikes,
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
        ...result._doc,
        request: {
          type: 'STORY',
          url: 'http://localhost:3000/api/stories',
          data: {}
        }
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Story with Id:${id} not found.` });
      else res.status(500).json({ error: error });
    });
};
const getUserWithStoryId = (req, res) => {
  const id = req.params.id;
  Story.findById(id)
    .populate('user', '-__v')
    .exec()
    .then(doc => {
      if (!doc) throw 404;
      res.status(200).json(doc.user);
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Story with Id:${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

module.exports = {
  getAllStories,
  getStoryWithId,
  createNewStory,
  putStoryWithId,
  updateStoryById,
  deleteStories,
  deleteStoryWithId,
  getUserWithStoryId
};
