const mongoose = require('mongoose');
const encrypt = require('../helpers/encrypt');
const Session = require('../models/session');

//mongoose model dependencies
mongoose.model('Session');

var Logout = {
	logout : function(req, res, callback) {
		const session_key = req.cookies.session_key;
		const user_id = req.cookies.user_id;
		res.clearCookie('user_id');
		res.clearCookie('session_key');

		Session.remove({ user_id: user_id, key: session_key }, function(err, session){
		if(err) callback(err, null);
			callback(null, { success: true });
		});
	}
}

module.exports = Logout;