const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {url} = require("../config.js");
const checkToken = require("../middleware/checkToken");

//Get request to list all users (protected)


//lists all users minus confidential information
router.get("/all", checkToken, async (req, res, next)=>{
    try{
        //if the request is coming from the searchbar then use the input text as a filter in mongoose
        const {searchval} = req.headers
        if(searchval){
            const response = await User.find({"name": { "$regex": `${searchval}`}})
            .select(["-password", "-email"])
            .populate("communities")
            res.status(200).json(response)                                                  
        }
        else{
            const response = await User.find().select(["-password", "-email"])
            res.status(200).json(response)                                                  

        }
    }
    catch(err){
        res.status(404).json({msg: "Could not get list of users. Server error."})
    }
})

//shows user profile minus the confidential information
router.get("/find/:id", checkToken, async (req, res, next)=>{
    const id = req.params.id
    try{
        const user = await User.findById(id, "-password")
   
        if(!user){
            return res.status(400).json({msg: "User not found"})
        }
        res.status(200).json(user)
    }
    catch(err){
        res.status(402).json({msg: "Error retrieving user"})
    }
})

//updates the user objects
router.put("/add-update/:id/", async(req, res)=>{
    const userId = req.params.id;
    try{
        const updatedUser = await User.findByIdAndUpdate(userId, req.body)
        res.status(201).json({userObj: updatedUser, msg: "Successfully modified user"})
    }
    catch(err){
        //add error
        res.status(201).json({msg: "Could not modify user"})
    }
})


module.exports = router