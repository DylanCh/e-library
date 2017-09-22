'use strict';
const PORT = process.env.PORT || 8081;
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParse= require('body-parser');
var routes = require('./routes');

app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({
    extended:true
}));
app.use('/public',express.static(__dirname+'/client'));
app.use('/bower',  express.static(__dirname + '/app/bower_components'));

app.set('view engine','pug');

app.get(['/'],(req,res)=>{
    res.setHeader('content-type','text/html');
    res.redirect('/public/index.html');
});

app.route(['/books'])
.get(routes.books);

app.route(['/books/search'])
.get(routes.booksByQuery);

/**
 * Details of the book, for edit/delete
 */
app.route(['/books/details'])
.post(routes.edit);

app.post('/editResults', routes.editResults);

app.route(['/addNew'])
.get(routes.addNew)
.post(routes.postNew);

app.listen(PORT,()=>{
    console.log('listening port ',PORT);
});