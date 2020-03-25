var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
var SavedSchema = new Schema({
  isSaved: Boolean,
  articleId: String
});

// creating model from the above schema, using mongoose's model method
var Saved = mongoose.model("Saved", SavedSchema);

// Export:
module.exports = Saved;
