const express = require('express');
const login_helper = require('../helpers/login');
const router = express.Router();

router.get('/', function(req, res) {
	const user_id = req.cookies.user_id;
	const session_key = req.cookies.session_key;
	login_helper.login_from_cookie(user_id, session_key, function(err, data){
		res.render('index', { title: 'Login', user: data.user });
	});
});

module.exports = router;