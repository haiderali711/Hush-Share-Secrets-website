var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var diarySchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  content: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Diary', diarySchema);

/** Diary is going to be something private for the user where he/she writes its private thoughts which it doesnt wanna share with anybody... 
not even anonymously



*/
