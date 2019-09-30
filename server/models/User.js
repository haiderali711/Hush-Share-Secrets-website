const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String },
  username: { type: String },
  password: { type: String },
  age: { type: Number, default: 16 },
  moderator: { type: Boolean, default: false },
  group: { type: String, default: '' }
});

module.exports = mongoose.model('User', userSchema);
