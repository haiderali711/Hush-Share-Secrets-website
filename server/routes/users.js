const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.get('/', UserController.getAllUsers);

router.post('/login', UserController.checkAuthentication);

router.get('/:id', UserController.getUserWithId);

router.post('/', UserController.createNewUser);

router.patch('/:id', UserController.changeToMod);

router.delete('/:id', UserController.deleteUserWithId);

module.exports = router;
