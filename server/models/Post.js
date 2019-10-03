const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: { type: String, required: true, maxlength: 200 },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  group: { type: String, ref: 'Group', default: '' }
});

postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', postSchema);
