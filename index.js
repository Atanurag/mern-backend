const express=require("express");
const {connectionToMongo} =require("./dbConnection.js");
const {book} =require("./model/booksModel.js");
const bookRoute=require("./routes/booksRoutes");
const cors=require("cors")
const app=express();
//for frontend i have used stackblitz because replit can run single port at once
//middleware for sending body part
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//middleware for cors policy
//option 1: Allow All Origins with default of cors(*)
app.use(cors());
//option 2: Allow Custom Origins
// app.use(
//   cors({
//   origin: "https://mern-project.spiritual-wisdo.repl.co/",
//   methods: ["GET","POST","PUT","DELETE"],
//   allowedHeaders: ["Content-Type"]
//   })
// )
//starting mongodb connection
connectionToMongo()
app.get("/node",(req,res)=>{
  res.status(300).send("hello backend")
})
// into this routes
app.use("/books",bookRoute)


app.listen(4000)




//here through node js no routing 
// const express=require("express");
// const {connectionToMongo} =require("./dbConnection.js");
// const {book} =require("./model/booksModel.js");
// const app=express();
// //middleware for sending body part
// app.use(express.urlencoded({extended:false}));
// app.use(express.json());
// //starting mongodb connection
// connectionToMongo()
// app.get("/node",(req,res)=>{
//   res.status(300).send("hello backend")
// })

// //route for adding or posting book to model
// app.post("/savebook",async(req,res)=>{
//    try{
//     if(
//        !req.body.title ||
//        !req.body.author ||
//        !req.body.publishYear
//       ){
//        return res.status(400).send({
//          message:"send the required field: title,author,publishyear",
//        });
//        } 
//     let newBook={
//       title:req.body.title,
//       author:req.body.author,
//       publishYear:req.body.publishYear
//     }
//     let saveBook=await book.create(newBook);
//     return res.status(201).send(saveBook);
//      }
//   catch(err){
//     console.log(err.message,"from savebook route");
//     response.status(500).send({message:err.message + "from savebook route"})
//   } 
// })

// //get all book from mongodb route
// app.get("/books",async(req,res)=>{
// try{
//   let books=await book.find();
//   return res.status(200).json({data:books,count:books.length})
// }
//   catch(err){
//     console.log(err.message,"error message")
//     res.status(500).send({message:err.message})
//   }
// })

// //route for getting one book from database
// app.get("/books/:id",async(req,res)=>{
//  try{
//    let {id}=req.params;
//    let Book=await book.findById(id);
//    return res.status(200).json(Book);
//   }
//   catch(err){
//     console.log(err.message,"from one book route");
//     return res.status(500).send({message:err.message})
//   }
// })

// //Route for updating book mine idea
// let updateOneId;
// app.get("/updatebook/:id",(req,res)=>{
//   updateOneId=req.params.id;
//   res.send(`<p>update book</p>
//     <form action="/updatebook" method="POST">
//     <input type="text" name="title" placeholder="title"/>
//     <input type="text" name="author" placeholder="author"/>
//     <input type="date" name="publishYear" placeholder="date"/> 
//     <input type="submit" value="send"/>
//            </form>`)
// })
// app.post("/updatebook",async(req,res)=>{
//   try{
//     if(
//        !req.body.title ||
//        !req.body.author ||
//        !req.body.publishYear ||
//        !updateOneId
//       ){
//       return res.status(400).send({
//          message:"send the required field: title,author,publishyear",
//        });
//       }

//      let updateBookObj={
//       title:req.body.title,
//       author:req.body.author,
//       publishYear:req.body.publishYear
//     }
//     let updateBook=await book.findByIdAndUpdate(updateOneId,updateBookObj);
//     if(!updateBook){
//       return res.status(404).json({message:"Book not found"});
//     }
//     return res.status(200).json({message:"Book updated Successfully!"});
//      }

//   catch(err){
//     console.log(err.message,"error while updating the one book");
//     res.status(500).send({message:err.message})
    
//   }
// })

// //Route for updating book using PUT method
// app.put("/books/:id",async(req,res)=>{
//   try{
//    if(
//        !req.body.title ||
//        !req.body.author ||
//        !req.body.publishYear
//      ){
//      return res.status(400).send({message:"send the required field: title,author,publishyear"})
//      }
//     let {id} = req.params
//      let updateBookObj={
//       title:req.body.title,
//       author:req.body.author,
//       publishYear:req.body.publishYear
//     }
//     let result=await book.findAndUpdateById(id,updateBookObj);
//     if(!result){
//       return res.status(404).send({message:"Book not found"});
//     }
//     return res.status(200).send({message:"Book updated successfully"});
//   }
//   catch(err){
//     return res.status(500).send({message:err.message});
//   }
// })


// //Route for deleting book mine idea
// app.get("/books/delete/:id",async(req,res)=>{
// try{
//   let {id} = req.params;
//   let deletedBook = await book.findByIdAndDelete(id);
  
//   if(!deletedBook){
//     return res.status(400).send({message:"Book not found"});
//   }
//   return res.status(200).send({message:"Book deleted successfully"});
// }  
//   catch(err){
//     res.status(500).send({message:err.message})
//   }
// })
// //Route for updating book using Delete method
// app.delete("/books/:id",async(req,res)=>{
//   try{
//   let {id} = req.params;
//   let deletedBook = await book.findByIdAndDelete(id);
  
//   if(!deletedBook){
//     return res.status(400).send({message:"Book not found"});
//   }
//   return res.status(200).send({message:"Book deleted successfully"});
// }  
//   catch(err){
//     res.status(500).send({message:err.message})
//   }
// })

// //for checking mine idea postman
// app.get("/formdata",(req,res)=>{
//   res.send(`
//   <p>add book</p>
//            <form action="/savebook" method="POST">
//     <input type="text" name="title" placeholder="title"/>
//     <input type="text" name="author" placeholder="author"/>
//     <input type="date" name="publishYear" placeholder="date"/> 
//     <input type="submit" value="send" />
//            </form>
//           `)
// })

// app.listen(4000)