const express = require('express');
const login_helper = require('../helpers/login');
const router = express.Router();

router.get('/', function(req, res) {
	login_helper.login_from_cookie(req, res, function(err, data){
		res.render('settings', { title: 'Settings', user: data.user });
	});
});

module.exports = router;