//library dependencies
const express = require('express');
const mongoose = require('mongoose');
const encrypt = require('../helpers/encrypt');
const User = require('../models/user');
const Session = require('../models/session');
const uuid = require('uuid');
const router = express.Router();
const cookie_lifetime = 1000 * 60 * 60 * 24 * 30; // 30 days

//mongoose model dependencies
mongoose.model('User');
mongoose.model('Session');

router.get('/', function(req, res) {
	res.render('login', { title : 'Login', message: 'Hello World' });
});

router.post('/', function(req, res) {
	const username = req.body.username;
	const password = req.body.password;

	User.findOne({ username : username }, function(err, user) {
		if(err) console.log(err);
		else if(user === undefined || user == null)
			res.render('login', { title : 'Login', message: 'User/Password Combination Not Found' });
		else {
			encrypt.compare_passwords(password, user.key, user.salt, function(err, data) {
				if(err) console.log(err);
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
					res.render('login', { title : 'Login', message: 'Success' });
				}
				else
					res.render('login', { title : 'Login', message: 'User/Password Combination Not Found' });
			});
		}
	})
	
});

module.exports = router;