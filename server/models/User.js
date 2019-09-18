var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String },
  name: { type: String },
  age: { type: Number },
  moderator: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
