const Category = require('../models/Category');

const getAllCategory = (req, res) => {
  Category.find()
    .select('-__v')
    .exec()
    .then(docs => {
      if (!docs.length) throw 404;

      res.status(200).json({
        categories: docs.map(doc => doc)
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: 'No categories found.' });
      else res.status(500).json({ error: error });
    });
};

const getCategoriesWithPostId = (req, res) => {
  const postId = req.params.postId;

  Category.find({ posts: { $eq: postId } })
    .select('-__v')
    .exec()
    .then(docs => {
      res.status(200).json({
        // categories: docs.map(doc => doc)
        categories: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.category
          };
        })
      });
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

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
  const cat = new Category(req.body);

  cat.save(function(err) {
    if (err) {
      return next(err);
    }
    res.status(200).json(cat);
  });
};

const getCategory = (req, res, next) => {
  const cat = req.params.category;

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

const deleteAllCategories = (req, res) => {
  Category.deleteMany()
    .exec()
    .then(result => {
      if (result.deletedCount === 0) throw 404;

      res.status(200).json({
        message: 'All Categories deleted.',
        deletedCount: result.deletedCount
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: 'No Categories found.' });
      else res.status(500).json({ error: error });
    });
};

module.exports = {
  getAllCategory,
  getCategoriesWithPostId,
  addSecretToCategory,
  addStoryToCategory,
  createCategory,
  getCategory,
  deleteAllCategories
};
