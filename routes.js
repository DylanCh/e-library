'use strict';
var dataLayer = require('./dataLayer');
var pug = require('pug');
var fs = require('fs');

// Populate the addNew form
var edit = (req,res)=>{
    // TODO: create edit.pug and inject the book to be updated
    res.render('edit'
       ,{pageData:req.body}
    );
};

var editResults = (req, res) => {
    let book = req.body;
    dataLayer.updateBook({ISBN:book.ISBN},book)
    .then(data =>{
      //res.json(data); 
      let navBar = fs.readFileSync('./client/navbar.html', 'utf8');
      res.setHeader('content-type','text/html');
      let message = (data) ? `
        <div>
          <div class="col-md-3">
            <img src="${book['Cover image']}">
          </div>
          <div class="col-md-7">
            <h3 class="h3">
              ${book.title}
            </h3>
          </div>
          <ul>
            <li>ISBN ${book.ISBN}</li>
            <li>Author: ${book.author}</li>
            <li>Year: ${book.year}</li>
            <li>Publisher: ${book.publisher}</li>
          </ul>
        </div>
      `  : `Sorry, the book ${book.title} was not updated`;
      let html = `
              <html>
                  <head>
                      <link href="../bower/bootstrap-css/css/bootstrap.min.css" rel="stylesheet" type="text/css">
                  </head>
                  <body>
                      <div>${navBar}</div>
                      <div class="container">
                        <div class = "row">
                          ${message}
                        </div>
                      </div>
                    </body>
                  </html>
              `;
      res.send(html);
    });
  };

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
    },

    edit : edit,
    editResults : editResults
};