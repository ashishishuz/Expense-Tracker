
const express=require('express');
const mongoose=require('mongoose')
const cors=require('cors');
const morgan=require('morgan');
const dotenv=require('dotenv');
const colors=require('colors');
const connectDb=require("./Config/connectDb")
const path=require('path')

const router = require('./Routes/UserRoute');
const router1=require('./Routes/transectionRoute')

// config dot ev file
dotenv.config();



dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors())

// Database connection
connectDb();

// Routes
//userRoutes
app.use('/api/v1/users',router)

//transection routes
app.use('/api/v1/transections', router1)

//testing server
// app.get('/',(req,res)=>{
//    res.json("hello")
// })

//static files
app.use(express.static(path.join(__dirname,'./Client/dist')))

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'./Client/dist/index.html'));
})

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
