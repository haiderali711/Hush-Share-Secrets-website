const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUserWithId);

router.post('/', UserController.createNewUser);

//Change the status of the User to Moderator with the given Username
router.patch('/:id', UserController.changeToMod);

router.delete('/:id', UserController.deleteUserWithId);

module.exports = router;
