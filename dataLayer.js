'use strict';
//var mongoose = require('mongoose');
//var librarySchema = require('./schema');
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
                            db.close();
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
        if (book===undefined|| Object.keys(book).length===0){
            resolve(data);
        }
        else{
            if(book.hasOwnProperty('title')){
                data.forEach((element)=> {
                    if(element.title.toLowerCase().indexOf(book.title.toLowerCase())>=0)
                        books.push(element);
                });
            }
            else if (book.hasOwnProperty('isbn')){
                data.forEach((element)=> {
                    if(element.ISBN.toLowerCase().indexOf(book.isbn)>=0)
                        books.push(element);
                });
            }
            else{
                throw new Error('Search query must have either ISBN or Title');
            }
            resolve(books);
        }
    }).catch(error=>{
        console.log(error);
    });     
};

module.exports.deleteBook = (book)=>{
    return new Promise((resolve, reject)=>{
        console.dir(book);
        let deleted = false;
        let title=book.title, isbn = book.isbn;
        MongoClient.connect(localDB,(err,db)=>{
            if(err){
              throw new Error('Cannot connect to database');
            }
            else{
                // TODO: delete from database
                db.collection('library')
                .deleteOne({title:title,isbn:isbn},(err1,oldRecord)=>{
                    if(err1){
                        db.close();
                        resolve(false);
                    }
                    else {
                        console.log('Record(s) deleted: ',oldRecord.result.n);
                        db.close();
                        if (oldRecord.result.n>0)
                            deleted = true;
                        resolve(deleted);
                    };
                });
            }
        });
    });
};

var updateBook = (book,updatedBook) => {
    return new Promise((resolve, reject)=>{
      MongoClient.connect(localDB,(err,db)=>{
        if(err){
          throw new Error('Cannot connect to database');
        }
        else{
          db.collection('library').updateOne({ISBN:book.ISBN},
              updatedBook,
              (err1,res)=>{
                if(err1) 
                  resolve(false);
                else resolve(true);
                db.close();
              }
          ); // end updateOne
        } // end else
      }); // end mongo connection
    });// end return promise
  }; //https://www.w3schools.com/nodejs/nodejs_mongodb_update.asp

module.exports.updateBook = updateBook;

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