const mongoose = require('mongoose')

const userPostSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post_message: String,
    previous_message: [{ type: String }],
    is_active: { type: Boolean, default: true },
  });
  
const UserPost = mongoose.model('UserPost', userPostSchema);

module.exports = { UserPost}