const Group = require('../models/Group');
const Post = require('../models/Post');
const User = require('../models/User');

/** Returns all the Groups from the database. Groups are returned
 * in particular format as can be seen in response code.
 *
 * end-point:       /api/groups
 * response-status: 200, if more than 0 Groups were found.
 * throws:          404, if no Groups were found.
 *                  500, if internal server error.
 */
const getAllGroups = (req, res) => {
  Group.find()
    .select('-__v')
    .exec()
    .then(docs => {
      if (!docs.length) throw 404;

      res.status(200).json({
        count: docs.length,
        groups: docs.map(doc => doc)
      });
    })
    .catch(error => {
      if (error === 404) res.status(404).json({ error: 'No groups found.' });
      else res.status(500).json({ error: error });
    });
};

/** Returns a Group with a given ID from the database. Group is returned
 * in particular format as can be seen in the code below.
 *
 * end-point:       /api/groups/:id
 * response-status: 200, if the Group with given ID was found.
 * throws:          404, if no Group with the given ID was found.
 *                  500, if internal server error.
 */
const getGroupWithId = (req, res) => {
  const id = req.params.id;

  Group.findById(id)
    .select('-__v')
    // .populate('user')
    .exec()
    .then(doc => {
      if (!doc) throw 404;

      res.status(200).json(doc);
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Group with Id:${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

/** Creates a new Group with given data from the request and returns it.
 *  Group is returned in particular format as can be seen in response code.
 *
 * end-point:       /api/groups
 * response-status: 201, if the Group was created successfully.
 * throws:          500, if internal server error.
 */
const createGroup = (req, res) => {
  const group = new Group(req.body);

  group
    .save()
    .then(result => {
      res.status(201).json(result);
    })
    .catch(error => {
      res.status(500).json({ error: error });
    });
};

/** Partially updates a Group with a given ID. Updated Group is returned
 * in particular format as can be seen in response code.
 *
 * end-point:       /api/groups/:id
 * response-status: 200, if the Group was updated successfully.
 * throws:          404, if no Group with given ID was found.
 *                  500, if internal server error.
 */
const updateGroupWithId = (req, res) => {
  const id = req.params.id;

  Group.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true })
    .select('-__v')
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'Group updated.',
        ...result._doc
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Group with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

/** Deletes all the Groups from the database. A 'message' and
 *  'deletedCount' is returned as a response.
 *
 * end-point:       /api/groups
 * response-status: 200, if all the Groups were deleted successfully.
 *                  Although we should have user '204' as response code,
 *                  we decided not to use that since it returns no response body.
 * throws:          404, if no Groups were found.
 *                  500, if internal server error.
 */
const deleteAllGroups = (req, res) => {
  Group.deleteMany()
    .select('-__v')
    .exec()
    .then(result => {
      if (result.deletedCount === 0) throw 404;

      res.status(200).json({
        message: 'All Groups deleted.',
        deletedCount: result.deletedCount
      });
    })
    .catch(error => {
      if (error === 404) res.status(404).json({ error: 'No Groups found.' });
      else res.status(500).json({ error: error });
    });
};

/** Deletes a Group with a given ID from the database. Deleted Group is returned
 * in particular format as can be seen in the code below.
 *
 * end-point:       /api/groups/:id
 * response-status: 200, if the Group with given ID was found.
 * throws:          404, if no Group with the given ID was found.
 *                  500, if internal server error.
 */
const deleteGroupWithId = (req, res) => {
  const id = req.params.id;

  Group.findOneAndDelete({ _id: id })
    .select('-__v')
    .exec()
    .then(result => {
      if (!result) throw 404;

      res.status(200).json({
        message: 'Group deleted.',
        ...result._doc
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({ error: `Group with Id: ${id} not found.` });
      else res.status(500).json({ error: error });
    });
};

const getPostsWithGroupId = (req, res) => {
  const id = req.params.id;

  Post.find({ group: { $eq: id } })
    .select('-__v')
    .exec()
    .then(docs => {
      // todo see if this returns 404 for both if the postId is not found and if the comments are 0
      //  adjust the comments accordingly
      if (docs.length === 0) throw 404;

      res.status(200).json({
        count: docs.length,
        comments: docs.map(doc => doc._doc)
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({
          error: `No Posts found associated with Group Id:${id}`
        });
      else res.status(500).json({ error: error });
    });
};

const getUsersWithGroupId = (req, res) => {
  const id = req.params.id;

  User.find({ group: { $eq: id } })
    .select('-__v')
    .exec()
    .then(docs => {
      // todo see if this returns 404 for both if the postId is not found and if the comments are 0
      //  adjust the comments accordingly
      if (docs.length === 0) throw 404;

      res.status(200).json({
        count: docs.length,
        users: docs.map(doc => doc._doc)
      });
    })
    .catch(error => {
      if (error === 404)
        res.status(404).json({
          error: `No Posts found associated with Group Id:${id}`
        });
      else res.status(500).json({ error: error });
    });
};

module.exports = {
  getAllGroups,
  getGroupWithId,
  createGroup,
  updateGroupWithId,
  deleteAllGroups,
  deleteGroupWithId,
  getPostsWithGroupId,
  getUsersWithGroupId
};
