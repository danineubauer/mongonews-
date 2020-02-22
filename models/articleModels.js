
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  
   title: { 
      type: String, 
      trim: true, 
      required: true
   },
   //password: 
   summary: { 
     type: String, 
     trim: true,
     unique: true, 
     required: true
   },
   link: {  
     type: String, 
     unique: true, 
     trim: true, 
     required: true, 
     match: [/.+@.+\..+/, 'enter valid email']
 
});

// This creates our model from the above schema, using mongoose's model method
var articlele = mongoose.model("articleMongoose", articleSchema);

// Export the User model
module.exports = articlele;
