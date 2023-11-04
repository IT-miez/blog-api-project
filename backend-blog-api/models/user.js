const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 30 },
  password: { type: String, required: true, maxLength: 50 },
  profilePicture: { type: String, required: false},
  profileSummary: { type: String, required: false, maxLength: 200 },
  creationDate: new Date()
});

UserSchema.virtual("url").get(function () {
  return `/catalog/user/${this._id}`;
});

UserSchema.virtual("creationDate_formatted").get(function () {
  return this.creationDate ? DateTime.fromJSDate(this.creationDate).toLocaleString(DateTime.DATE_MED) : '';
});

// Export model
module.exports = mongoose.model("User", UserSchema);
