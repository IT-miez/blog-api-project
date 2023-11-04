const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  _author: { type: Schema.types.ObjectId, required: true},
  title: { type: String, required: true, maxLength: 50 },
  thumbnail: { type: String, required: false},
  postContent: { type: String, required: false, maxLength: 500 },
  creationDate: new Date(),
  editDate: {type: Date}
});

PostSchema.virtual("url").get(function () {
  return `/catalog/post/${this._id}`;
});

UserSchema.virtual("creationDate_formatted").get(function () {
  return this.creationDate ? DateTime.fromJSDate(this.creationDate).toLocaleString(DateTime.DATE_MED) : '';
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
