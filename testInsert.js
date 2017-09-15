'use strict';
var test = require('./dataLayer');
var schema = require('./schema');

var book1 = {
    ISBN:'9781449320317',
    author:'Jess Chadwick',
    title:'Programming ASP.NET MVC 4',
    year:2012,
    publisher:'O\'Reily'
};

//var book2 =  new schema(book1);
//console.dir(book2);

var book2 = {
    "title" : "Problem Solving with C",
    "author" : "Jacqueline A Jones",
    "ISBN" : "1881991482",
    "Cover image" : "",
    "year" : 1996,
    "publisher" : "Scott Jones"
};

var book4 = {
    "title" : "Fundamentals of Database Systems",
    "author" : "Ramez Elmasri",
    "ISBN" : "0321369572",
    "publisher" : "Addison Wesley"
};


var insertionSuccess = test.insertBook(book1);
//test.insertBook(book3);
console.log(insertionSuccess);

/*
var mongodb = require('mongodb');
  var MongoClient = mongodb.MongoClient;
  var mongoUrl = 'mongodb://.....';

 MongoClient.connect(mongoUrl, function(err, db) {
    if (err) {
        callback(false);
    } else {
        library = db.collection('library');

        var book1 = {
        ISBN:'0-375-70402-7',
        author:'Haruki Murakami',
        title:'Norwegian Wood',
        year:1987,
         publisher:'Kodansha'
        };

        library.insert(book1);
    }
});
*/