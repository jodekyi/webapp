const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
	res.render('login', { title : 'Login', message: 'Hello World' });
});

module.exports = router;