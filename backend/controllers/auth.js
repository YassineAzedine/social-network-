const User = require("../models/user");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt')



// const expressJwt = require('express-jwt')
const fs = require("fs");

const  singin = (req,res)=>{


    
    User.findOne({email:req.body.email} , (err,user)=>{

        const data =  req.body.email

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
const signout = (req,res)=>{
    res.clearCookie("t");
    res.json({message:"Déconnécté"});

}
const requireSignin = expressJWT({
    secret : process.env.JWT_SECRET,
    userProperty:"auth",
    algorithms:["HS256"],
});
const hasAuthorization = (req,res,next)=>{
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if(!authorized){
        return res.json({
            error:"Non authorized"
        })
    }
    next();
}
module.exports = {
    singin,
    signout,
    hasAuthorization,
    requireSignin,
}