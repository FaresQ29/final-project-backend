const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.model

const userSchema = new Schema({
    name: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friendList: [{type: Schema.Types.ObjectId, ref: "User"}],
    communities: [{type: Schema.Types.ObjectId, ref: "Community"}],
    userDetails: {
        dateOfBirth: String,
        profileImg: String,
        bio: String,
        location: String
    }
})

const User = Model("User", userSchema)

module.exports = User