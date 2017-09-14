'use strict';
var mongoose = require('mongoose');
var librarySchema = require('./schema');
// class Book{
//     constructor(title,isbn,author,year){
//         this.title = title;
//         this.isbn = isbn;
//         this.author = author;
//         this.year = year;
//     }
// }

/**
 * 
 * @param {*Book} book 
 */
var insertBook = (book)=>{
    
};

var getBooks = (title,isbn,author,year)=>{
    let books = [];
};

module.exports.getAllBooks = ()=>{
    // TODO: how to connect to mongodb
    let conn = mongoose.createConnection('mongodb://localhost/e-library',
        (err)=>{
            if (err!==undefined)
                console.log("MongoDB Connection Error:",err)
        });
    //console.log(mongoose.connection.collections);
    let books = [];
    // librarySchema.find({},(err,docs)=>{
    //     if(!err){
    //         books =  docs;
    //     }
    //    else books=[{}]; 
    // });
    conn.on('open',()=>{
        console.dir('Connection established: ',conn.collections)
    });

    conn.once('on',()=>{
        mongoose.connection.db.collection('library',(err,collection)=>{
            collection.find({}).toArray((err,docs)=>{
                books = docs;
            });
        });
    });
    return books;
};

var deleteBook = (title, isbn)=>{
    let deleted = false;
    try{
        // TODO: delete from database
    }
    catch (e){
        console.warn(e);
        deleted=false;
    }
    return deleted;
};


var updateBook = (book)=>{

};

