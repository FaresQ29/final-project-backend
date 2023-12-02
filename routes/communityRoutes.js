const express = require("express");
const router = express.Router()
const Community = require("../models/Community.model")
const {url} = require("../config.js")
const checkToken = require("../middleware/checkToken")



router.get("/all", checkToken, async (req, res)=>{
    try{
        const response = await Community.find({})
        .populate("admin", "-password -friendRequests")
        .populate("members", "-password -friendRequests")
        res.status(201).json(response)
    }
    catch(err){
        res.status(402).json({msg: "Could not get communities data from server"})
    }
})
router.post("/all", async (req, res)=>{
    try{
        const response = await Community.create(req.body)
        res.status(200).json(response)

    }
    catch(err){
        res.status(402).json({msg: "Could not add community. Server Error"})
    }
})

module.exports = router
