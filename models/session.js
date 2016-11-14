const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sessionSchema = new Schema({
	user_id: { type: String, required: true },
	key: { type: String, required: true },
	created_at: Date,
	expires_at: Date
});

var Session = mongoose.model('Session', sessionSchema);
module.exports = Session;