const mongoose=require("mongoose");
//mongodb usname and password;
//gevago5506@maazios.com
//@anurag1
const mongodbConnectionUrl="mongodb+srv://gevago5506:5iMdMV7IVb9rdBJN@cluster0.2w1x0fw.mongodb.net/?retryWrites=true&w=majority";

const connectionToMongo=async()=>{
  try{
  let con=await mongoose.connect(mongodbConnectionUrl);
  console.log(`mongodb connected to ${con.connection.host}`)
  }
  catch(err){
    console.log(err.message,"mongodb connetion error")
  }
}
module.exports={connectionToMongo}
