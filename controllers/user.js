const { User } = require("../models/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async(req, res)=>{
    try{
        const { email, password } = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).send({"errorMsg": "Email already exists."})
        }

        const encodedPassword = await bcrypt.hash(password, 8);

        const newUser = await User.create({email, password: encodedPassword});
        console.log(newUser);
        const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET_KEY);

        newUser.token = token;
        await newUser.save();

        return res.cookie("token", token,{
            secure: true,
            httpOnly: true
        }).send({"successMsg": "user created"})
    }
    catch(err){
        console.log(err);
        res.status(500).send({"errorMsg":"Unable to register user. Please try Again!"})
    }
}

const logoutUser = async(req, res)=>{
    try{
        const { _id } = req.user;
        const existingUser = await User.findOne({_id: _id});

        existingUser.token = undefined;
        await existingUser.save();
        
        return res.send({"message": "You are Logged out."});
    }catch(err){
        console.log(err);

        return res.status(500).send("Error during logout. Try again.");
    }
}


const loginUser = async(req, res)=>{
    try{
        const { password } = req.body;
        const existingUser = await User.findOne({email: req.body.email});
        if(!existingUser){
           return res.status(404).send({"errorMsg": "email does not exists."})
        }

        const isEqual = await bcrypt.compare(password, existingUser.password);
        if(!isEqual){
           return res.status(401).send({"errorMsg": "Invalid credentials."});
        }

        const token = jwt.sign({_id: existingUser._id}, process.env.JWT_SECRET_KEY);
        existingUser.token = token;
        await existingUser.save();

        return res.cookie('token', token, 
        {
            secure: true,
            httpOnly: true
        }).send({"successMsg": "Logged in successfully"}); 

    }catch(err){
        console.log(err);
        res.status(500).send("Error while logging in")
    }
}

module.exports = { createUser, loginUser, logoutUser };