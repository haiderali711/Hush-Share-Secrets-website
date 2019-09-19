var Category = require('../models/Category');

//Instance with just the Post (Secret)  ID

const addSecretToCategory = (req, res) => {
  Category.findOneAndUpdate(
    { category: req.body.category },
    { $push: { posts: req.body.posts } },
    { new: true },
    (err, foundCateg) => {
      res.status(200).json({ category: foundCateg });
    }
  ).catch(error => {
    if (error === 404) res.status(404).json();
    else res.status(500).json({ error: error });
  });
};

//Instance with just the Story ID
const addStoryToCategory = (req, res) => {
  Category.findOneAndUpdate(
    { category: req.body.category },
    { $push: { stories: req.body.stories } },
    { new: true },
    (err, foundCateg) => {
      res.status(200).json({ category: foundCateg });
    }
  ).catch(error => {
    if (error === 404) res.status(404).json();
    else res.status(500).json({ error: error });
  });
};

const createCategory = (req, res, next) => {
  var cat = new Category({ category: req.params.category });
  cat.save(function(err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(cat);
  });
};

const getCategory = (req, res, next) => {
  var cat = req.params.category;

  Category.find({ category: { $regex: cat } }, function(err, foundStories) {
    if (err) {
      return next(err);
    }
    if (foundStories === null) {
      return res.status(404).json({ message: 'Nothing Found' });
    }
    res.json({ Stories: foundStories });
  });
};

module.exports = {
  addSecretToCategory,
  addStoryToCategory,
  createCategory,
  getCategory
};
