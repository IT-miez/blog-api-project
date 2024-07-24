const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 30 },
  password: { type: String, required: true, maxLength: 100 },
  profilePicture: { type: String, required: false },
  profileSummary: { type: String, required: false, maxLength: 200 },
}, { timestamps: true });

UserSchema.virtual('url').get(() => `/users/${this._id}`);


UserSchema.virtual('creationDate_formatted').get(function formatCreationDate() {
  return this.creationDate ? DateTime.fromJSDate(this.creationDate).toLocaleString(DateTime.DATE_MED) : '';
});

// Virtual for data formatting for createdAt
UserSchema.virtual('createdAtFormatted').get(function createdAtFormatted() {
  const date = this.createdAt;
  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  return formattedDate;
});

UserSchema.set('toJSON', { virtuals: true });
// Export model
module.exports = mongoose.model('User', UserSchema);
