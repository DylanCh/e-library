var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const definition = {
    title : String,
    author : {type:String, required: false},
    ISBN : String,
    year: {type:Number, required:false},
    publisher : {type:String,required:false},
    'Cover image':{type:String,required:false}
};

var librarySchema = new Schema(definition,{collection:'library'});

module.exports = mongoose.model('library',librarySchema);

var dataLayer = require('./dataLayer');

//dataLayer.getAllBooks().then(d=>{console.dir(d)});

dataLayer.getBooks({
    title : 'Begin'
},(data)=>{
    console.log(data);
});