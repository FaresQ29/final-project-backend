const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.model

const userSchema = new Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friendList: [{type: Schema.Types.ObjectId, ref: "User"}],
    friendRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
    communities: [{type: Schema.Types.ObjectId, ref: "Community"}],
    userDetails: {
        dateOfBirth: {type: String, default:""},
        profileImg: {type: String, default:""},
        bio: {type: String, default:""},
        location: {type: String, default:""},
        gender : {type: String, enum: ['Male', 'Female', ""], default: "" }
    },
    updates: [{
        text: String,
        postDate: String,
        updateComments: [{
            updateCommentText: String,
            commentAuthor: String,
            authorId: Schema.Types.ObjectId,
            date: String,
            commentId: String,
            editDate: {type: String, default:""},
        }]
    }]

})

const User = Model("User", userSchema)

module.exports = User