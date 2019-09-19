const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diarySchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Diary', diarySchema);
