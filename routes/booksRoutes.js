const express=require("express");
const Rou=express.Router();
const {book} =require("../model/booksModel");

//route for adding or posting book to model
Rou.post("/savebook",async(req,res)=>{
   try{
    if(
       !req.body.title ||
       !req.body.author ||
       !req.body.publishYear ||
       !req.body.uniqueID
      ){
       return res.status(400).send({
         message:"send the required field: title,author,publishyear",
       });
       } 
    let newBook={
      title:req.body.title,
      author:req.body.author,
      publishYear:req.body.publishYear,
      uniqueID:req.body.uniqueID
    }
    let saveBook=await book.create(newBook);
    return res.status(201).send(saveBook);
     }
  catch(err){
    console.log(err.message,"from savebook route");
    response.status(500).send({message:err.message + "from savebook route"})
  } 
})

//get all uniqueuserBook from mongodb route
Rou.get("/mybook/:uid",async(req,res)=>{
 // console.log(req.params.uid)
try{
  let books=await book.find({uniqueID:req.params.uid});
 // console.log(books)
  return res.status(200).json({data:books,count:books.length})
}
  catch(err){
    console.log(err.message,"error message")
    res.status(500).send({message:err.message})
  }
})

//route for getting one book from database
Rou.get("/:id",async(req,res)=>{
 try{
   let {id}=req.params;
   let Book=await book.findById(id);
   return res.status(200).json(Book);
  }
  catch(err){
    console.log(err.message,"from one book route");
    return res.status(500).send({message:err.message})
  }
})

//Route for updating book mine idea
let updateOneId;
Rou.get("/updatebook/:id",(req,res)=>{
  updateOneId=req.params.id;
  res.send(`<p>update book</p>
    <form action="/books/updatebook" method="POST">
    <input type="text" name="title" placeholder="title"/>
    <input type="text" name="author" placeholder="author"/>
    <input type="date" name="publishYear" placeholder="date"/> 
    <input type="submit" value="send"/>
           </form>`)
})
Rou.post("/updatebook",async(req,res)=>{
  try{
    if(
       !req.body.title ||
       !req.body.author ||
       !req.body.publishYear ||
       !updateOneId
      ){
      return res.status(400).send({
         message:"send the required field: title,author,publishyear",
       });
      }

     let updateBookObj={
      title:req.body.title,
      author:req.body.author,
      publishYear:req.body.publishYear
    }
    let updateBook=await book.findByIdAndUpdate(updateOneId,updateBookObj);
    if(!updateBook){
      return res.status(404).json({message:"Book not found"});
    }
    return res.status(200).json({message:"Book updated Successfully!"});
     }

  catch(err){
    console.log(err.message,"error while updating the one book");
    res.status(500).send({message:err.message})
    
  }
})

//Route for updating book using PUT method
Rou.put("/:id",async(req,res)=>{
  try{
   if(
       !req.body.title ||
       !req.body.author ||
       !req.body.publishYear ||
       !req.body.uniqueID
     ){
     return res.status(400).send({message:"send the required field: title,author,publishyear"})
     }
    let {id} = req.params
     let updateBookObj={
      title:req.body.title,
      author:req.body.author,
      publishYear:req.body.publishYear,
      uniqueID:req.body.uniqueID
    }
    let result=await book.findByIdAndUpdate(id,updateBookObj);
    if(!result){
      return res.status(404).send({message:"Book not found"});
    }
    return res.status(200).send({message:"Book updated successfully"});
  }
  catch(err){
    return res.status(500).send({message:err.message});
  }
})


//Route for deleting book mine idea
Rou.get("/delete/:id",async(req,res)=>{
try{
  let {id} = req.params;
  let deletedBook = await book.findByIdAndDelete(id);
  
  if(!deletedBook){
    return res.status(400).send({message:"Book not found"});
  }
  return res.status(200).send({message:"Book deleted successfully"});
}  
  catch(err){
    res.status(500).send({message:err.message})
  }
})
//Route for updating book using Delete method
Rou.delete("/:id",async(req,res)=>{
  try{
  let {id} = req.params;
  let deletedBook = await book.findByIdAndDelete(id);
  
  if(!deletedBook){
    return res.status(400).send({message:"Book not found"});
  }
  return res.status(200).send({message:"Book deleted successfully"});
}  
  catch(err){
    res.status(500).send({message:err.message})
  }
})

//for checking mine idea postman for saving book
Rou.get("/formdata",(req,res)=>{
  res.send(`
  <p>add book</p>
           <form action="/books/savebook" method="POST">
    <input type="text" name="title" placeholder="title"/>
    <input type="text" name="author" placeholder="author"/>
    <input type="date" name="publishYear" placeholder="date"/> 
    <input type="submit" value="send" />
           </form>
          `)
})

module.exports=Rou

