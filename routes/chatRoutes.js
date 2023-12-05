const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat.model");

const {url} = require("../config.js")
//app.use("/chat", chatRoutes)

router.get("/list", async(req, res)=>{
    try{
        const response = await Chat.find({})
        res.status(201).send(response)
        console.log("retrieved chats");

    }
    catch(err){
        console.log("Could not get chats");
    }
})

router.post("/add", async (req, res, next)=>{
    console.log(req.body);
    try{
        const response = await Chat.create(req.body)
        res.status(200).json(response)
        console.log("Successfully added chat");
    }
    catch(err){
        res.status(404).json({msg: "Could not add Chat data"})
    }
})
router.delete("/delete/:id", async (req, res, next)=>{

    try{
        const response = await Chat.findByIdAndDelete(req.params.id)
        res.status(200).json(response)
        console.log("Successfully deleted chat");
    }
    catch(err){
        res.status(404).json({msg: "Could not delete Chat data"})
    }
})


module.exports = router