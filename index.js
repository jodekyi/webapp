'use strict';
//libraries
const express = require('express');
const mongoose = require('mongoose');
const controller = require('./controllers/index');
const body_parser = require('body-parser');
const path = require('path');

//port
const PORT = 8080;

//express components
const app = express();
const router = express.Router();

//database setup
mongoose.connect('mongodb://localhost/webapp_db');

//viewengine setup
app.set('view engine', 'pug');
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended : true }));

//static content setup
app.use(express.static(path.join(__dirname, './bower_components')));

//routing
app.use('/', require('./controllers/index'));
app.use('/tags', require('./controllers/tags'));
app.use('/login', require('./controllers/login'));
app.use('/register', require('./controllers/register'));

//port listening
app.listen(PORT);
console.log('Running on http://localhost: ' + PORT);