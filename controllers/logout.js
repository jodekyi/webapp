//library dependencies
const express = require('express');
const logout_helper = require('../helpers/logout');
const router = express.Router();

router.get('/', function(req, res) {	
	logout_helper.logout(req, res, function(err, data){
		res.redirect('/');
	});
});

module.exports = router;