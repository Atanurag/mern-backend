const mongoose=require("mongoose");
//schema
const bookSchema=mongoose.Schema(
  {
    title:{
      type:String,
      required:true
    },
    author:{
      type:String,
      required:true
    },
    publishYear:{
      type:String,
      required:true
    },
    uniqueID:{
      type:String,
      required:true
    }
  },
    {
      timestamps:true      
    },
  

);
//model
 const book=mongoose.model('Books',bookSchema);
module.exports={book};