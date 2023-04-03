
const { UserPost } = require("../Models/postModel");
const { User } = require("../Models/userModel");
const mongoose = require('mongoose')

// Save Users
module.exports.saveUser = async(req,res)=>
{
    try{
      const {name,email,password,role_id } = req.body;
      role_id: req.body.role_id || 2;

      const result = await User(req.body).save();
      
      res.status(201).send({message:"User created Successfully",result});

    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }

}

//get user
module.exports.getUser = async(req,res)=>{
    try {
      const userId = req.params.user_id;
      const user = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(userId) } },
        {
          $lookup: {
            from: 'roles',
            localField: 'role_id',
            foreignField: 'role_id',
            as: 'role',
          },
        },
        { $unwind: '$role' },
        { $project: { _id: 0, name: 1, email: 1, role: '$role.role_name' } },
      ]);

      if (user.length === 0) {
        res.status(404).send('User not found');
      } else {
        res.send(user[0]);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }

}

module.exports.savePost =async(req,res)=>{
  // API to create a new post
  try {
    const userPost = new UserPost({
      user_id: req.params.user_id,
      post_message: req.body.post_message,
    });
    const result = await UserPost(userPost).save();
    res.status(201).send({msg:"post created successfully",result});
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }

}

module.exports.editPost = async(req,res)=>{
  // API to edit an existing post
  try {
    const post = await UserPost.findById(req.params.post_id);
    if (!post) {
      res.status(404).send('Post not found');
    } else if (post.user_id != req.body.user_id) {
      res.status(403).send('Access denied');
    } else {
      post.previous_message.push(post.post_message);
      post.post_message = req.body.post_message;
      const result = await post.save();
      res.status(200).send({msg:"User Editor succesfully",result});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }

}


 //DELETE
module.exports.deletePost = async(req,res)=>{

  try {
    const post = await UserPost.findById(req.params.post_id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is authorized to delete post
    if (post.user_id.toString() !== req.body.id) {
      return res.status(401).json({ message: 'User not authorized to delete post' });
    }

    // Soft delete post
    post.is_active = false;
    await post.save();

    res.status(200).send({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: 'Server error' });
  }


}

module.exports.getpostbyId = async(req,res)=>{
    try {
      const posts = await UserPost.find({ user_id: req.params.user_id, is_active: true }).sort({ created_at: -1 });
  
      res.json(posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }

}