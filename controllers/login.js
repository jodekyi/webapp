//library dependencies
const express = require('express');
const login_helper = require('../helpers/login');
const router = express.Router();

router.get('/', function(req, res) {
	res.render('login', { title : 'Login', message: 'Hello World' });
});

router.post('/', function(req, res) {
	const username = req.body.username;
	const password = req.body.password;
	login_helper.login_from_page(username, password, function(err, data){
	if(err) console.log(err);

	res.render('login', { title: 'Login', success: data.success !== undefined ? data.success : false });
	});
	
});

module.exports = router;