const express = require('express');
const router = express.Router()
const {createUser , getUserById,
    getUser} =  require('../controllers/user')
const {singin , signout} = require("../controllers/auth")                 
    // console.log("🚀 ~ file: user.js ~ line 5 ~ getUser", getUser)

router.post("/api/users/add",createUser );
router.get("/api/user/:userId", getUser);
router.post("/api/auth/signin", singin);
router.get("/api/auth/signout", signout);


router.param('userId',getUserById);

module.exports = router