'use strict';
//libraries
const express = require('express');
const adaro = require('adaro');
const mongoose = require('mongoose');
const controller = require('./controllers/index');
const cookie_parser = require('cookie-parser');
const body_parser = require('body-parser');
const path = require('path');

//port
const PORT = 8080;

//express components
const app = express();

//cookies/session store
app.use(cookie_parser('who knows if i will actually need this'));

//set up router
const router = express.Router();

//database setup
mongoose.connect('mongodb://localhost/webapp_db', function(err) {
	if(err) console.log(err);
	else console.log('connected');
});

//viewengine setup
const options = {
	cache: (app.get('env') === 'production')
}
app.engine('dust', adaro.dust(options));
app.set('view engine', 'dust');
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended : true }));

//static content setup
app.use(express.static(path.join(__dirname, './bower_components')));

//routing
app.use('/', require('./controllers/index'));
app.use('/tags', require('./controllers/tags'));
app.use('/login', require('./controllers/login'));
app.use('/logout', require('./controllers/logout'));
app.use('/register', require('./controllers/register'));
app.use('/settings', require('./controllers/settings'));

//port listening
app.listen(PORT);
console.log('Running on http://localhost: ' + PORT);

//cleanup
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('mongoose connection closed'); 
    process.exit(0); 
  }); 
});