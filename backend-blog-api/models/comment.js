const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  _author: { type: Schema.types.ObjectId, required: true},
  _post: { type: Schema.types.ObjectId, required: true},
  title: { type: String, required: true, maxLength: 50 },
  commentContent: { type: String, required: true},
  creationDate: new Date()
});

// Virtual for post's URL
CommentSchema.virtual("url").get(function () {
  return `/catalog/comment/${this._id}`;
});


// Export model
module.exports = mongoose.model("Comment", CommentSchema);
