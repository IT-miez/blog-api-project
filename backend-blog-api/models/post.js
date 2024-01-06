const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const user = require('./user');

const { Schema } = mongoose;

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, required: true, ref: user },
  title: { type: String, required: true, maxLength: 50 },
  thumbnail: { type: String, required: false },
  content: { type: String, required: true },
}, { timestamps: true });

PostSchema.virtual('url').get(function returnUrl() {
  return `/catalog/post/${this._id}`;
});

PostSchema.virtual('creationDate_formatted').get(function creationDateFormatted() {
  return this.creationDate ? DateTime.fromJSDate(this.creationDate).toLocaleString(DateTime.DATE_MED) : '';
});

// Virtual for data formatting for createdAt
PostSchema.virtual('createdAtFormatted').get(function createdAtFormatted() {
  const date = this.createdAt;
  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  return formattedDate;
});

PostSchema.set('toJSON', { virtuals: true });

// Export model
module.exports = mongoose.model('Post', PostSchema);
