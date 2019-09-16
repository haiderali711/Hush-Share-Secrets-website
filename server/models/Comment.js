const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  content: { type: String, required: true, maxlength: 300 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  published: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);
