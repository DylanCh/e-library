var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var librarySchema = new Schema(
   {
       title : String,
       author : {type:String, required: false},
       ISBN : String,
       year: {type:Number, required:false},
       publisher : {type:String,required:false}
   } 
)

module.exports = mongoose.model('library',librarySchema);