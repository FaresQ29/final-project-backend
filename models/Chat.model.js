const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.model

const chatSchema = new Schema({
    chatLogs: [{text: String, date: Date()}],
    userOne: [{type: Schema.Types.ObjectId, ref: "User"}],
    userTwo: [{type: Schema.Types.ObjectId, ref: "User"}]
})

const Chat = Model("Chat", chatSchema)

module.exports = Chat