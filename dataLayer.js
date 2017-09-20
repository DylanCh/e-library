'use strict';
var mongoose = require('mongoose');
var librarySchema = require('./schema');
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
const localDB = 'mongodb://localhost/e-library';

var insertBook = (book,res)=>{
    return new Promise((resolve,reject)=>{
        let isSuccess = false;

        if (typeof(book)!==typeof({})){
            resolve(isSuccess);
            throw new Error('Doc to be inserted is not an object');
        }

        else if (Object.keys(book).length<=0){
            resolve(isSuccess);
            throw new Error('Doc to be inserted is an empty object');
        }

        MongoClient.connect(localDB,(err,db)=>{
            if(err){
                console.log('Connection failed');
                resolve(isSuccess);
            }
            else{
                let library = db.collection('library');
                library.insert(book,(err1,m)=>{
                    if (err1){
                        console.log('Insertion failed');
                        resolve(isSuccess);
                    }
                    else{
                        console.log('Insertion succeed',m);
                        isSuccess=true
                        resolve(isSuccess);
                    }
                });
            }
        });
    });
};

module.exports.insertBook = insertBook;

var getAllBooks = ()=>{
    return new Promise((resolve,reject)=>{
        let books = [];
        MongoClient.connect(localDB,(err,db)=>{
            if(err){
                throw new Error('Cannot connect to database');
            }
            else{
                db.collection('library').find({}).toArray((err1,docs)=>{
                        if (err1)
                            throw new Error('SELECT error: ',err1);
                        else {
                            books = docs;
                            resolve(books);
                        }
                    }
                );
            }
        });
    });
};

module.exports.getAllBooks = getAllBooks;

module.exports.getBooks = (book,resolve)=>{
    let books = [];
    getAllBooks().then(data=>{
        console.log(data.length);
        if (Array.prototype.slice.call(arguments).length===0 || Object.keys(book).length===0){
            resolve(data);
        }
        else{
            if(book.hasOwnProperty('title'))
                data.forEach((element)=> {
                    if(element.title.toLowerCase().indexOf(title)>=0)
                        books.push(element);
                }, this);
            else if (book.hasOwnProperty('isbn')){
                data.forEach((element)=> {
                    if(element.ISBN.toLowerCase().indexOf(isbn)>=0)
                        books.push(element);
                }, this);
            }
            else{
                throw new Error('Search query must have either ISBN or ')
            }
            resolve(data);
        }
    });     
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

// module.exports.reset = (reset)=>{
//     MongoClient.connect(localDB,(err,db)=>{
//         if(err){
//             console.log('Connection failed');
//         }
//         console.warn('[WARNING] Going to reset the library database, are you sure? (y/n)');
//         process.openStdin().addListener('data',d=>{
//             if (d.toString().trim().toLowerCase()==='y')
//                 db.collection('library').drop((arg1)=>{
//                     if (arg1){
//                         throw new Error('Collection not being able to drop');
//                     }
//                     else{
//                         console.log('Collection dropped');
//                         reset.forEach(e=>{
//                             insertBook(e).then((rec)=>{
//                                 console.log('Inserted:',typeof(rec));
//                             });
//                         });
//                     }
//                 });
//             else {
//                 console.log('database is not dropped');
//                 process.exit();
//             }
//         });
//     });
// };