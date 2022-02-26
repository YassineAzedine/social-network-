const User = require("../models/user");


const fs = require("fs");



const createUser = (req, res)=>{
    const {name,email,password}  = req.body;
    const user = new User({name , email , password});
    user.save((err, user)=>{
        if(err) res.json({error:err});
        req.hashed_password = undefined;
        req.salt = undefined;
        res.json(user);
    })
}
 
 const getUserById = (req,res,next,id)=>{
     User.findById(id)
     .populate("following" , "_id name")
     .populate("followers" , "_id name")
     .exec((err,user)=>{
         if(err || !user) res.json({error:err});
         req.profile = user;
      next();


     });

 };
 const getUser = (req,res)=>{
     req.profile.hashed_password = undefined;
     req.profile.salt = undefined;
     res.json(req.profile);

 };
 module.exports = {
    createUser,
    getUserById,
    getUser
 }