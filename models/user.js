const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	key: { type: String, required: true },
	salt: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true }
});

var User = mongoose.model('User', userSchema);
module.exports = User;