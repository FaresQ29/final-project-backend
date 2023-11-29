const express = require("express");
const router = express.Router()
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {url} = require("../config.js")
const checkToken = require("../middleware/checkToken")
//to set the token expiry to 3 days
const maxAge = 3*24*60*60;

// Register user post request
router.post("/register", async (req, res, next)=>{
    //verification of request data and check if user email is already registered
    const {name, email, password} = req.body
    if(!name) return res.status(422).json({msg: "Name is required"})
    if(!email) return res.status(422).json({msg: "Email is required"})
    if(!password) return res.status(422).json({msg: "Password is required"})
    const userExists = await User.findOne({email:email})
    if(userExists) return res.status(422).json({msg: "Email is already registered"})

    //create hashed password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    try{
        const response = await User.create({name, email, password: passwordHash})
        const userId = response._id;

        const token = jwt.sign(
            { userId },
            process.env.SECRET,
            {expiresIn: maxAge}
        )
        res.status(200).json( {userId: response._id, userName: response.name, authToken: token, msg: "Successfully  registered"} )
    }
    catch(err){
        res.status(404).json({msg: "Could not connect to the server", err})
    }
})


// Login user post request
router.post("/login", async (req, res, next)=>{
    const { email, password} = req.body
    //Validations for email, pass and check if user actually exists in db
    if(!email) return res.status(422).json({msg: "email is required"})
    if(!password) return res.status(422).json({msg: "password is required"})
    //check if email exists
    const user = await User.findOne({email})
    if(!user){return res.status(422).json({msg: "Email doesn't exist."})}

    try{
        //check if password matches
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){return res.status(422).json({msg: "Invalid password."})}
        const secret = process.env.SECRET
        const token = jwt.sign({id: user._id}, secret)
        res.status(200).json({authToken: token, name:user.name, email: user.email, msg: "Successfully logged in"})
    }
    catch(err){
        res.status(401).json({msg: "Cannot login"})
    }
})

router.get('/verify', checkToken, async (req, res, next) => {       
    const {id} = req.payload
    try{
        const user = await User.findById(id)
        res.status(200).json({token: req.token, user});
        console.log("token worked");
      
    }
    catch(err){
        res.status(400).json({msg: "could not verify user"})
        console.log("token didn't work");

    }
});




module.exports = router