const mongoose=require('mongoose');
const colors=require('colors');
const connectDb= async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("..........Database connected..........");
    } catch(error){
        console.log(`there is ${error}`.bgRed)
    }
   
}

module.exports=connectDb;

