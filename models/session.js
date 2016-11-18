const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sessionSchema = new Schema({
	user_id: { type: String, required: true },
	key: {type: String, required: true },
	created_at: { type: Date, required: true },
	expires_at: { type: Date, required: true },
});

var Session = mongoose.model('Session', sessionSchema);
module.exports = Session;