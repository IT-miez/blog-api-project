const mongoose = require('mongoose');
const user = require('./user');
const post = require('./post');

const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        author: { type: Schema.Types.ObjectId, required: true, ref: user },
        post: { type: Schema.Types.ObjectId, required: true, ref: post },
        commentContent: { type: String, required: true },
    },
    { timestamps: true }
);

// Virtual for data formatting for createdAt
CommentSchema.virtual('createdAtFormatted').get(function createdAtFormatted() {
    const date = this.createdAt;
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return formattedDate;
});

CommentSchema.set('toJSON', { virtuals: true });

// Export model
module.exports = mongoose.model('Comment', CommentSchema);
