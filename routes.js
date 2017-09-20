'use strict';
var dataLayer = require('./dataLayer');
var pug = require('pug');
var fs = require('fs');

module.exports = {
    addNew : (req,res)=>{
        res.render('addNew.pug');
    },

    postNew : (req,res)=>{
        console.log(req.body);
        let body = req.body;
        if (body.year!==undefined && body.year!==null){
            body.year = parseInt(body.year);
        }
        res.setHeader('content-type','text/html');
        dataLayer.insertBook(body).then(resolve=>{
            console.log('Inserted: ',resolve);
            let navBar = fs.readFileSync('./client/navbar.html', 'utf8');
            let html = `
            <html>
                <head>
                    <link href="../bower/bootstrap-css/css/bootstrap.min.css" rel="stylesheet" type="text/css">
                </head>
                <body>
                    <div>${navBar}</div>
            `;
            if(resolve){
                res.send(html
                    +`<div>${body['title']} has been inserted.
                        <a href="/"> GO BACK </a>   
                    </div></body></html>`);
            }
            else res.send(html
                +`<div>${body['title']} has not been inserted.
                    <a href="/"> GO BACK </a>
                </div></body></html>`);
        });
    },

    books : (req,res)=>{
        dataLayer.getAllBooks().then((books)=>{
            res.json(books);
        },
        (err)=>{ 
            console.error('Cannot get data');
        });
    },

    booksByQuery : (req,res)=>{
        let title = req.query.title;
        let isbn = req.query.isbn;
        let query = {};
        if (title.trim()==='')
            query.isbn = isbn;
        else if (isbn.trim()==='')
            query.title = title;
        dataLayer.getBooks(query,books=>{
            res.json(books);
        });
    }
};