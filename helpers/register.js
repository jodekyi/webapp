const mongoose = require('mongoose');
const encrypt = require('../helpers/encrypt');
const User = require('../models/user');

//mongoose model dependencies
mongoose.model('User');

var Register = {
	register_user : function(username, email, password, callback) {
		encrypt.encrypt_password(password, null, function(err, data) {
		const key = data.key;
		const salt = data.salt;
		const new_user = new User();
		new_user.username = username;
		new_user.email = email;
		new_user.key = key;
		new_user.salt = salt;
		new_user.created_at = new Date();
		new_user.updated_at = new Date();
		new_user.save(function(err){
			if(err) callback(err, null);
			else callback(null, new_user);
		});
	});
	}
}

module.exports = Register;