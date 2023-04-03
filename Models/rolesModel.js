const mongoose = require('mongoose')

const role = new mongoose.Schema({
    role_id: { type: Number},
    role_name: String,
  });
  
  const roles = mongoose.model('roles', role);
  
module.exports = { roles}