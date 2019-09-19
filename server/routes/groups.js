const express = require('express');
const router = express.Router();

const GroupsController = require('../controllers/groups');

router.get('/', GroupsController.getAllGroups);

router.get('/:id', GroupsController.getGroupWithId);

router.post('/', GroupsController.createGroup);

router.patch('/:id', GroupsController.updateGroupWithId);

router.delete('/', GroupsController.deleteAllGroups);

router.delete('/:id', GroupsController.deleteGroupWithId);

router.get('/:id/posts', GroupsController.getPostsWithGroupId);

router.get('/:id/users', GroupsController.getUsersWithGroupId);

module.exports = router;
