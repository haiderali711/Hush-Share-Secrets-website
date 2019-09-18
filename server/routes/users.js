const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUserWithId);

router.post('/registration/', UserController.createNewUser);

//router.delete("/", UserController.deleteUser);

//Change the status of the User to Moderator with the given Username
router.patch('/user2Mod/:userName', UserController.changeToMod);

router.delete('/:id', UserController.deleteUserWithId);

module.exports = router;
