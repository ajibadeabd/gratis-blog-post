const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        blogId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Blog'
        },
        comment: {
            type: String,
            required: true
        },
       
    },
    {
        timestamps: true
    });
    module.exports = mongoose.model('Comment', commentSchema)
