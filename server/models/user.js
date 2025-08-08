const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
		type: Boolean,
		default: false
	},
  // id: {
  //   type: isObjectIdOrHexString
  // }
});

module.exports = mongoose.model('user', UserSchema);
