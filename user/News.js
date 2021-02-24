const mongoose = require('mongoose');  
const NewsSchema = new mongoose.Schema({  
  title: { type:String, required:true, unique:true},
  newsdesc: {type:String, required:true},
  url: {type:String, required:true},
  image: {type:String, required:true},
  date: {type:Date, required:true}
});

mongoose.model('News', NewsSchema);

module.exports = mongoose.model('News');