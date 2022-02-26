const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express()
require('dotenv').config();
const userRoutes = require('./routes/user');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(cookieParser);
app.use(cookieParser());
app.use('/' , userRoutes);

 const db = 'mongodb://localhost:27017/socialnetwork' 


const  port = process.env.PORT
const  Dbd = process.env.DB

//connect to database
const coonecttodb = async ()=>{
    try{
       await mongoose.connect(db,{
           
    });
    console.log('connected');

    }catch(error){
console.log(error)
    };
};
coonecttodb();
// mongoose.connect(db,(err,success)=>{
//    if(success){
//     console.log('connected');
// }else{
//     console.log(err)
// }
       

    
// })

//home page

// app.get('/' , (req,res)=>{
//     res.send('hello home')

// })
app.listen(port,(req,res)=>{
    console.log('server runnig in server 3000')
})

