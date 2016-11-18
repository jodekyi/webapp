const mongoose = require('mongoose');
const encrypt = require('../helpers/encrypt');
const User = require('../models/user');
const Session = require('../models/session');
const uuid = require('uuid');

//mongoose model dependencies
mongoose.model('User');
mongoose.model('Session');

const cookie_lifetime = 1000 * 60 * 60 * 24 * 30; // 30 days

var Login = {
	login_from_page : function(req, res, callback) {
		const username = req.body.username;
		const password = req.body.password;
		User.findOne({ username : username }, function(err, user) {
			if(err) callback(err, null);
			else if(user === undefined || user == null)
				callback(null, { success: false });
			else {
				encrypt.compare_passwords(password, user.key, user.salt, function(err, data) {
					if(err) callback(err, null);
					else if(data.equal)	
					{
						const bytes = new Buffer(16);
						uuid.v4(null, bytes, 0);
						const session_key = uuid.unparse(bytes);
						const new_session = new Session();
						new_session.user_id = user.id;
						new_session.key = session_key;
						new_session.created_at = new Date();
						new_session.expires_at = new Date() + cookie_lifetime;
						new_session.save();
						res.cookie('user_id', user.id, { maxAge: cookie_lifetime });
						res.cookie('session_key', session_key, { maxAge: cookie_lifetime });
						callback(null, { success: true });
					}
					else callback(null, { success: false });
				});
			}
		});
	},

	login_from_cookie : function(req, res, callback) {
		const user_id = req.cookies.user_id;
		const session_key = req.cookies.session_key;
		Session.findOne({ user_id: user_id, key: session_key }, function(err, session){
		if(err) callback(err, null);

		User.findById(user_id, function(err, user) {
			if(err) callback(err, null);
			else callback(null, {user: user });
		});
		});
	}
}

module.exports = Login;