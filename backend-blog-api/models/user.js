const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: { type: String, required: true, maxLength: 30 },
        password: { type: String, required: true, maxLength: 100 },
        profilePicture: { type: String, required: false },
        profileSummary: { type: String, required: false, maxLength: 200 },
    },
    { timestamps: true }
);

UserSchema.virtual('url').get(() => `/users/${this._id}`);

UserSchema.virtual('creationDate_formatted').get(function formatCreationDate() {
    return this.creationDate
        ? DateTime.fromJSDate(this.creationDate).toLocaleString(
              DateTime.DATE_MED
          )
        : '';
});

UserSchema.virtual('creationDateFormatted').get(function formatCreationDate() {
    return this.createdAt
        ? DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED)
        : '';
});

UserSchema.set('toJSON', { virtuals: true });
// Export model
module.exports = mongoose.model('User', UserSchema);
