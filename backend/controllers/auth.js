const User = require("../models/user");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


// const expressJwt = require('express-jwt')
const fs = require("fs");

const  singin = (req,res)=>{


    
    User.findOne({email:req.body.email} , (err,user)=>{

        const data =  req.body.email
        console.log("🚀 ~ file: auth.js ~ line 16 ~ User.findOne ~ data", data)
       if(err || !user)res.json({error:err});

       user.comparePassword(req.body.password, function (err,isMatch){
           if(!isMatch){
               res.json({error:"Email ou mot de pass est incoorect"});

           }
           const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET)
           res.cookie("t",token,{
               expire:new Date() + 9999
           })
           return res.json({
    token,
    user,
           })
       }) 
    })
   
};
module.exports = {
    singin
}