var User = require('../models/User');
const { uniqueNamesGenerator } = require('unique-names-generator');

// Return a list of all users
const getAllUsers = (req, res, next) => {
  User.find(function(err, foundUsers) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ users: foundUsers });
  });
};

//Authenticate the user
const checkAuthentication = (req, res) => {
  var email = req.body.email;
  var newPassword = req.body.password;

  User.findOne({ email: email }, (err, foundUser) => {
    if (foundUser === null) {
      return res.status(404).json({ message: 'user not found' });
    }

    if (newPassword === foundUser.password) {
      res.status(200).json({
        user: {
          moderator: foundUser.moderator,
          id: foundUser._id,
          username: foundUser.username,
          loggedIn: true,
          age: foundUser.age
        }
      });
    } else {
      res.json({ message: 'Wrong email or password' });
    }
  }).catch(error => {
    if (error === 401) res.status(404).json();
    else res.status(500).json({ error: error });
  });
};

// Create a new user
const createNewUser = (req, res, next) => {
  var emailU = req.body.email;

  User.findOne({ email: emailU }, (err, foundUser) => {
    if (foundUser === null) {
      var user = null;
      if (req.body.group !== null) {
        user = new User({
          email: emailU,
          username: uniqueNamesGenerator(),
          password: req.body.password,
          group: req.body.group
        });
      } else {
        user = new User({
          email: emailU,
          username: uniqueNamesGenerator(),
          password: req.body.password
        });
      }

      user.save(function(err) {
        if (err) {
          return next(err);
        }
        res.status(201).json(user);
      });
    } else {
      res.status(201).json({ emailAready: true });
    }
  }).catch(error => {
    if (error === 401) res.status(404).json();
    else res.status(500).json({ error: error });
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
    res.status(200).json(user);
  });
};

//Change the status of the User to Moderator with the given Username
const changeToMod = (req, res, next) => {
  var id = req.params.id;
  var mod = req.body.moderator;
  console.log(mod);

  if (mod == undefined) {
    User.updateOne({ _id: id }, { $set: req.body }, function(err, user) {
      if (err) {
        return next(err);
      }
      if (user == null) {
        return res.status(404).json({ message: 'user not found' });
      }
      res.status(200).json(user);
    });
  } else {
    var newBody = { moderator: mod };
    User.updateOne({ username: req.body.username }, { $set: newBody }, function(
      err,
      user
    ) {
      if (err) {
        return next(err);
      }
      if (user == null) {
        return res.status(404).json({ message: 'user not found' });
      }
      res.status(200).json(user);
    });
  }
};

//replace the body of the user at a specific id
const putUserWithId = (req, res) => {
  const id = req.params.id;

  User.findOneAndReplace({ _id: id }, req.body, { new: true })
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'User replaced.'
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `User with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

module.exports = {
  getAllUsers,
  getUserWithId,
  createNewUser,
  checkAuthentication,
  deleteUserWithId,
  changeToMod,
  putUserWithId
};
