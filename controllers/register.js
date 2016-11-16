const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const encrypt = require('../helpers/encrypt');
const User = require('../models/user');
mongoose.model('User');

router.get('/', function(req, res) {
	res.render('register', { title : 'Register', message: 'Hello World' });
});

router.post('/', function(req, res) {
	const email = req.body.email;
	const username = req.body.username;
	encrypt.encrypt_password(req.body.password, null, function(err, data) {
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
			console.log(err);
		});
	});
	res.render('register', { title : 'Register', message: 'Hello World'});
});

module.exports = router;
