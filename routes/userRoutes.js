const express = require("express");
const router = express.Router();
const { saveUser, getUser,savePost, editPost, deletePost, getpostbyId,  } = require("../controller/userController");


// User's Api's 
router.post('/user',saveUser);
router.get('/user/:user_id',getUser);
router.post('/user/:user_id/post',savePost);
router.put('/user/post/:post_id',editPost);
router.delete('/user/post/:post_id',deletePost);
router.get('/user/post/:user_id',getpostbyId);

module.exports = router;