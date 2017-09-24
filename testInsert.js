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
    title : 'Beginner\'s Russian',
    ISBN : '0781812518',
    author : 'Anna Kudyma',
    'Cover image' : 'https://prodimage.images-bn.com/pimages/9780781812511_p0_v2_s550x406.jpg',
    publisher : 'Hippocrene Books, Inc.',
    year : 2010
};

const book3 = {
    title : 'One Thousand and One Nights',
    ISBN : '0192750135',
    author : '',
    'Cover image' : 'https://images-na.ssl-images-amazon.com/images/I/518Nb9heqmL._SY344_BO1,204,203,200_.jpg',
    publisher : 'Oxford University Press'
};

const books =[book1,book2,book3];

books.push({
    title : 'Problem Solving with C',
    author : 'Jacqueline A Jones',
    ISBN : '1881991482',
    'Cover image' : 'https://images-na.ssl-images-amazon.com/images/I/41sV-1V66CL._SX343_BO1,204,203,200_.jpg',
    year : 1996,
    publisher : 'Scott Jones'
});

books.push({
    title : 'Fundamentals of Database Systems',
    'edition' : 7,
    author : 'Ramez Elmasri',
    ISBN : '0321369572',
    publisher : 'Addison Wesley',
    'Cover image' : 'https://www.pearsonhighered.com/assets/bigcovers/0/1/3/3/0133970779.jpg',
    year : 2015
});

books.push({
    ISBN : '9781449320317',
    author : 'Jess Chadwick',
    title : 'Programming ASP.NET MVC 4',
    year : 2012,
    publisher : 'O\'Reily Media',
    'Cover image' : 'https://n3.sdlcdn.com/imgs/a/5/h/Programming-Asp-Net-Mvc-4-SDL013791489-1-b4ea0.jpg'
});

books.push({
    title : 'The Meaning of Marriage',
    ISBN : '978-1-59463-187-0',
    author : 'Timothy Keller',
    year : 2013,
    'Cover image' : 'https://images-na.ssl-images-amazon.com/images/I/41bz5-qnBZL._SX313_BO1,204,203,200_.jpg'
});

books.push({
    title : 'Kafka on the Shore',
    ISBN : '1-84343-110-6',
    author : 'Haruki Murakami',
    'Cover image' : 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Kafkaontheshore.jpg/220px-Kafkaontheshore.jpg',
    publisher : '',
    year : 2002
});

books.push({
    title : 'Modern PHP New Features and Good Practices',
    ISBN : '1491905018',
    author : 'Josh Lockhart',
    'Cover image' : 'https://covers.oreillystatic.com/images/0636920033868/cat.gif',
    publisher : 'O\'Reilly Media'
});

books.push({
    title : 'Heartbreak Hotel',
    ISBN : '034554143X',
    author : 'Jonathan Kellerman',
    'Cover image' : 'https://images-na.ssl-images-amazon.com/images/I/61AVOCHcxJL._AC_UL320_SR276,320_.jpg',
    publisher : 'Ballantine Books'
});

 books.push({
    title : 'The Dark Tower I: The Gunslinger',
    ISBN : '1501143514',
    author : 'Stephen King',
    'Cover image' : 'https://upload.wikimedia.org/wikipedia/en/thumb/d/db/The_Gunslinger.jpg/220px-The_Gunslinger.jpg',
    publisher : 'Grant',
    year : 1982
});

books.push({
    title : 'Head First C#',
    ISBN : '1449343503',
    author : 'Andrew Stellman',
    'Cover image' : 'https://covers.oreillystatic.com/images/0636920027812/cat.gif',
    publisher : 'O\'Reilly Media',
    year : 2013
});

books.push({
    title:'Test',
    author:'Test',
    ISBN:'Test'
});

var reset = ()=>{
    books.forEach(e=>{
        test.insertBook(e)
        .then((res,rej)=>{
            console.log('Inserted: ',res);
        });
    });
};

reset();