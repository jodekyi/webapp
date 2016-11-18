//library dependencies
const express = require('express');
const login_helper = require('../helpers/login');
const router = express.Router();

router.get('/', function(req, res) {	
	login_helper.login_from_cookie(req, res, function(err, data){
		if(data.user !== null) res.redirect('/');
		else res.render('login', { title : 'Login', message: 'Hello World' });
	});
});

router.post('/', function(req, res) {
	login_helper.login_from_page(req, res, function(err, data){
	if(err) console.log(err);

	res.redirect('/');
	});
	
});

module.exports = router;