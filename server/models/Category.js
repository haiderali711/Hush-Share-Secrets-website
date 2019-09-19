const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category: { type: String, index: { unique: true, dropDups: true } },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

module.exports = mongoose.model('Category', categorySchema);
