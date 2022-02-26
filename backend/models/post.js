const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {ObjectId} = mongoose.Schema;
const Schema = mongoose.Schema
const PostSchema = new Schema({
    text : {
        type:String,
        trim:true,
        required:true,
    },
    postedBy:{
        type:ObjectId,
        trim : "User",
    },
   
  likes : [{type:ObjectId, ref: "User"}],
  comments : [
      {
    type:String,
    created: {type:Date,default:Date.now},
    postedBy :
    {
        type:ObjectId,
        trim:"User",
    }




}
],

 

},{
    timestamps:true,
});

PostSechema.virtual("password")
.get(function(){
    return this._password;
})
.set(function(password){
    
        this._password = password;
        let salt = (this.salt = bcrypt.genSaltSync(10));
        this.hashed_password = bcrypt.hashSync(password, salt);
    
    
    
    
})
PostSechema.methods.comparePassword = function(passwordToCheck,cb){
    bcrypt.compare(passwordToCheck, this.hashed_password,  function(err,isMatch){
if(err) cb(err);
cb(null , isMatch);
    })
}
