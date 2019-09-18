var Category = require('../models/category');

//Instance with just the Post (Secret)  ID

const newCategoryForSecret = (req, res) => {
  const cat = new Category({
    category: req.body.category,
    post: req.body.post
  });

  cat
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

//Instance with just the Story ID
const newCategoryForStory = (req, res) => {
  const cat = new Category({
    category: req.body.category,
    story: req.body.story
  });

  cat
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

const getSecretByCat = (req, res, next) => {
  var cat = req.params.category;

  Category.find({ category: { $regex: cat } }, function(err, foundSecrets) {
    if (err) {
      return next(err);
    }
    if (foundSecrets === null) {
      return res.status(404).json({ message: 'Nothing found' });
    }
    res.json({ Secrets: foundSecrets });
  });
  //.populate('post','content');
};

const getStoryByCat = (req, res, next) => {
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
  //.populate('stories','content');
};

module.exports = {
  newCategoryForSecret,
  getSecretByCat,
  getStoryByCat,
  newCategoryForStory
};
