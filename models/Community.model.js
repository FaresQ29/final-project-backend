const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.model

const communitySchema = new Schema({
    communityName: {type: String, required: true, unique: true},
    dateCreated: {type: String, required: true},
    communityBio: {type: String, required: true},
    communityAdmin: [{type: Schema.Types.ObjectId, ref: "User"}],
    communityMembers: [{type: Schema.Types.ObjectId, ref: "User"}],
    communityContent: [ 
        {
            post: String,
            comments : [{userComment: String, commentAuthor: [{type: Schema.Types.ObjectId, ref: "User"}]}]
        }
    ]

})

const Community = Model("User", communitySchema)

module.exports = Community