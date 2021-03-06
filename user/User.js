const mongoose = require('mongoose');  
const UserSchema = new mongoose.Schema({  
  email: { type:String, required:true, unique:true},
  password: {type:String, required:true},
  name: {type:String, required:true}
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');