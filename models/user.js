const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	created_at: Date,
	updated_at: Date
});

var User = mongoose.model('User', userSchema);
module.exports = User;