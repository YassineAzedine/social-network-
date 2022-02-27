const express =require("express");
const {requireSignin} = require("../controllers/auth");
const {addPost,getAllPosts} = require("../controllers/post");
const {getUserById} = require("../controllers/user");

const router = express.Router();
router.get("/api/posts/:userId",requireSignin, getAllPosts);
router.post("/api/posts/create/:userId",requireSignin, addPost);

router.param("userId", getUserById);
module.exports = router;


