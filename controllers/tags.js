const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
		res.render('./tags', { title : 'Tags', message: 'Hello World' });
});

module.exports = router;