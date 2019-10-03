const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const storySchema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
});

storySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Story', storySchema);
