const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.model

const communitySchema = new Schema({
    name: {type: String, required: true, unique: true},
    img: String,
    dateCreated: {type: String, required: true},
    description: {type: String, required: true},
    admin: {type: Schema.Types.ObjectId, ref: "User"},
    members: [{type: Schema.Types.ObjectId, ref: "User"}],
    themes: [{type: String, required: true}],
    content: [ 
        {
            post: String,
            date: String,
            postAuthor: {type: Schema.Types.ObjectId, ref: "User"},
            comments : [
                {
                    userComment: String,
                    commentAuthor: [{type: Schema.Types.ObjectId, ref: "User"}],
                    commentDate: String,
                    editDate: {type: String, default: ""}
                }
            ]
        }
    ]
})

const Community = Model("Community", communitySchema)

module.exports = Community