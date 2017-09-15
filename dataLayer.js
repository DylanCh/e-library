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

module.exports.insertBook = (book)=>{
    let isSuccess = false;

    // Type check
    if (typeof(book)!==typeof({})){
        throw new Error('Doc to be inserted is not an object');
    }
    else console.dir(book);

    let conn = mongoose.createConnection('mongodb://localhost/local',
        (err)=>{

            if (err!==undefined){
                console.log("MongoDB Connection Error:",err);
                return false;
            }
        });
    conn.once('on',()=>{
        console.log('Connection established');
        mongoose.connection.db.collection('library',(err,collection)=>{
            collection.insert(book)
            .then(()=>{
                console.log('insertion successful');
                isSuccess = true;
            })
            .catch((err)=>{
                console.log('Insertion failed');
            });
        });
    });
    return isSuccess;
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

