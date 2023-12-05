const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Model = mongoose.model

const chatSchema = new Schema({
        user1: String,
        user2: String

})

const Chat = Model("Chat", chatSchema)

module.exports = Chat