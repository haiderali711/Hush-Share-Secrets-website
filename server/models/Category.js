var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  category: { type: String },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  story: { type: Schema.Types.ObjectId, ref: 'Story' }
});

module.exports = mongoose.model('User', categorySchema);
