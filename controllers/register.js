//library dependencies
const express = require('express');
const register_helper = require('../helpers/register');
const login_helper = require('../helpers/login');
const router = express.Router();

router.get('/', function(req, res) {
	login_helper.login_from_cookie(req, res, function(err, data){
		if(data.user !== null) res.redirect('/');
		else res.render('register', { title : 'Register', message: 'Hello World' });
	});
});

router.post('/', function(req, res) {
	const email = req.body.email;
	const username = req.body.username;
	const password = req.body.password;
	register_helper.register_user(username, email, password, function(err, data) {
		if(data.already_exists) res.render('register', { title : 'Register', message: data.already_exists });
		else if(err) { 
			console.log(err); 
			res.render('register', { title : 'Register', message: 'Error' });
		}
		else
			res.redirect('/');
	});
});

module.exports = router;
