const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role_id: { type: Number, default: 2 },
  });
  
  const User = mongoose.model('User', userSchema);
  
module.exports = { User}