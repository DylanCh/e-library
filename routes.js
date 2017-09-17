'use strict'
var dataLayer = require('./dataLayer');
var pug = require('pug');

module.exports = {
    addNew : (req,res)=>{
    // res.setHeader('content-type','text-html');
    //     res.send(`
    //     <html>
    //         <title>eLibrary</title>
    //         <head>
    //             <link href="../bower/bootstrap-css/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    //             <link href="./site.css" rel="stylesheet" type="text/css">
    //             <script src="../bower/angularjs/angular.min.js"></script>
    //             <script src="App.js"></script>
    //         </head>
    //         <body ng-app="libraryApp" ng-controller="libraryController">
    //             <div class="form-group">
    //                 <form method="post" action="/addNew">
    //                     <label class="label">Title</label>
    //                     <input type="text" name="title" class="form-control"/>
    //                 </form>
    //             </div>
    //         </body>
    //     </html>
    // `);
        res.render('addNew.pug');
    },

    books : (req,res)=>{
        dataLayer.getAllBooks().then((books)=>{
            res.json(books);
        },
        (err)=>{ 
            console.error('Cannot get data');
        })
    }
};