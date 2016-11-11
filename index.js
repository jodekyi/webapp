'use strict';
const express = require('express');
const path = require('path');
const PORT = 8080;

const app = express();
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'bower_components')));
app.get('/', function(req, res) {
	res.render('index', { title : 'Home', message: 'Hello World' });
});
app.get('/tags', function(req, res) {
	res.render('tags', { title : 'Tags', message: 'Hello World' });
});
app.get('/login', function(req, res) {
	res.render('login', { title : 'Login', message: 'Hello World' });
});
app.get('/register', function(req, res) {
	res.render('register', { title : 'Register', message: 'Hello World' });
});

app.listen(PORT);
console.log('Running on http://localhost: ' + PORT);