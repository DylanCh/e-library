'use strict';
var test = require('./dataLayer');

const book1 = {
    title : 'Core Java Volume I--Fundamentals',
    'Cover image':'https://images-na.ssl-images-amazon.com/images/I/41dHD22LDJL._SX390_BO1,204,203,200_.jpg',
    publisher:'Prentice Hall',
    author :'Cay S. Horstmann',
    ISBN : '0134177304',
    year :2016,
};

const book2 = {
    "title" : "Beginner's Russian",
    "ISBN" : "0781812518",
    "author" : "Anna Kudyma",
    "Cover image" : "https://prodimage.images-bn.com/pimages/9780781812511_p0_v2_s550x406.jpg",
    "publisher" : "Hippocrene Books, Inc.",
    "year" : 2010
};

const book3 = {
    "title" : "One Thousand and One Nights",
    "ISBN" : "0192750135",
    "author" : "",
    "Cover image" : "https://images-na.ssl-images-amazon.com/images/I/518Nb9heqmL._SY344_BO1,204,203,200_.jpg",
    "publisher" : "Oxford University Press"
};

const books =[book1,book2,book3];

var reset = ()=>{
    books.forEach(e=>{
        test.insertBook(e)
        .then((res,rej)=>{
            console.log('Inserted: ',res);
        });
    });
};

reset();