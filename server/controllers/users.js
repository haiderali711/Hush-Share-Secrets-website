var User = require('../models/User');

// Return a list of all users
const getAllUsers = (req, res, next) => {
  User.find(function(err, foundUsers) {
    if (err) {
      return next(err);
    }
    res.json({ users: foundUsers });
  });
};

// Create a new user
const createNewUser = (req, res, next) => {
  var user = new User(req.body);
  user.save(function(err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(user);
  });
};

// Return the user with the given ID
const getUserWithId = (req, res, next) => {
  var id = req.params.id;
  User.findById(id, function(err, foundUser) {
    if (err) {
      return next(err);
    }
    if (foundUser === null) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(foundUser);
  });
};

// Delete the user with the given ID
const deleteUserWithId = (req, res, next) => {
  var id = req.params.id;
  User.findOneAndDelete({ _id: id }, function(err, user) {
    if (err) {
      return next(err);
    }
    if (user === null) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(user);
  });
};

//Change the status of the User to Moderator with the given Username
const changeToMod = (req, res, next) => {
  var userName = req.params.userName;

  User.update({ username: userName }, { $set: { moderator: true } }, function(
    err,
    user
  ) {
    if (err) {
      return next(err);
    }
    if (user == null) {
      return res.status(404).json({ message: 'user not found' });
    }
    res.json(user);
  });
};

module.exports = {
  getAllUsers,
  getUserWithId,
  createNewUser,
  // deleteUser,
  deleteUserWithId,
  changeToMod
};
