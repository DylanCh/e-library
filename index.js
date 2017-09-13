'use strict';
const PORT = process.env.PORT || 8081;
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParse= require('body-parser');
var dataLayer = require('./dataLayer');

app.use(cors());
app.use(bodyParse.json());
app.use('/public',express.static(__dirname+'/client'));
app.use('/bower',  express.static(__dirname + '/app/bower_components'));

// TODO: set HTML as view engine
//app.set('view engine','html');

app.get(['/'],(req,res)=>{
    res.setHeader('content-type','text/html');
    res.redirect('/public/index.html');
});

app.route(['/books'])
.get((req,res)=>{
    let books = dataLayer.getAllBooks();
    res.json(books);
});

/**
 * Details of the book
 */
app.route(['/books/details'])
.get((req,res)=>{
    
});

app.listen(PORT,()=>{
    console.log('listening port ',PORT);
});