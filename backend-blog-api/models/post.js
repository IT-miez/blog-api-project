const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const user = require("./user");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true, ref: user},
  title: { type: String, required: true, maxLength: 50 },
  thumbnail: { type: String, required: false},
  content: { type: String, required: true },
}, {timestamps: true});

PostSchema.virtual("url").get(function () {
  return `/catalog/post/${this._id}`;
});

PostSchema.virtual("creationDate_formatted").get(function () {
  return this.creationDate ? DateTime.fromJSDate(this.creationDate).toLocaleString(DateTime.DATE_MED) : '';
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
