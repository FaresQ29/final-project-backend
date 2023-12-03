const express = require("express");
const router = express.Router()
const Community = require("../models/Community.model")
const {url} = require("../config.js")

//     /community


router.get("/all", async (req, res)=>{
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
router.get("/find/:id", async (req, res)=>{
    try{
        const response = await Community.findById(req.params.id)
        .populate("admin", "-password -friendRequests")
        .populate("members", "-password")
        res.status(201).json(response)
    }
    catch(err){
        res.status(402).json({msg: "Could not get community data from server"})
    }
})
router.put("/edit/:id", async (req, res)=>{
    try{
        const response = await Community.findByIdAndUpdate(req.params.id, req.body)
        console.log(response);
        res.status(201).json(response)
    }
    catch(err){
        res.status(402).json({msg: "Could not edit community, error from server"})
    }
})
router.delete("/delete/:id", async (req, res)=>{
    try{
        const response = await Community.findByIdAndDelete(req.params.id)
        console.log(response);
        res.status(201).json(response)
    }
    catch(err){
        res.status(402).json({msg: "Could not delete community, error from server"})
    }
})
module.exports = router
