'use strict';
var mongoose = require('mongoose');
var librarySchema = require('./schema');
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
const localDB = 'mongodb://localhost/e-library';

module.exports.insertBook = (book,res)=>{
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

// module.exports.insertBook = (book)=>{
//     let isSuccess = false;

//     // Type check
//     if (typeof(book)!==typeof({})){
//         throw new Error('Doc to be inserted is not an object');
//     }
//     else console.dir(book);

//     let conn = mongoose.createConnection('mongodb://localhost/local',
//         (err)=>{

//             if (err!==undefined){
//                 console.log("MongoDB Connection Error:",err);
//                 return false;
//             }
//         });
//     conn.once('on',()=>{
//         console.log('Connection established');
//         mongoose.connection.db.collection('library',(err,collection)=>{
//             collection.insert(book)
//             .then(()=>{
//                 console.log('insertion successful');
//                 isSuccess = true;
//             })
//             .catch((err)=>{
//                 console.log('Insertion failed');
//             });
//         });
//     });
//     return isSuccess;
// };

var getBooks = (title,isbn,author,year)=>{
    let books = [];
};

module.exports.getAllBooks = ()=>{
    return new Promise((resolve,reject)=>{
        let books = [];
        MongoClient.connect(localDB,(err,db)=>{
            if(err){
                console.error('Cannot connect to database');
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

// module.exports.getAllBooks = ()=>{
//     // TODO: how to connect to mongodb
//     let conn = mongoose.createConnection('mongodb://localhost/e-library',
//         (err)=>{
//             if (err!==undefined)
//                 console.log("MongoDB Connection Error:",err)
//         });
//     //console.log(mongoose.connection.collections);
//     let books = [];
//     // librarySchema.find({},(err,docs)=>{
//     //     if(!err){
//     //         books =  docs;
//     //     }
//     //    else books=[{}]; 
//     // });
//     conn.on('open',()=>{
//         console.dir('Connection established: ',conn.collections)
//     });

//     conn.once('on',()=>{
//         mongoose.connection.db.collection('library',(err,collection)=>{
//             collection.find({}).toArray((err,docs)=>{
//                 books = docs;
//             });
//         });
//     });
//     return books;
// };

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

