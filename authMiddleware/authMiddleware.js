const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const authMiddleware = async(req, res, next)=>{
    try{
        console.log("middleware running");
        const { token }= req.cookies;

        if(!token){
            throw new Error();
        }

        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Requested User",user);
        const validUser = await User.findOne({token: token});
        if(!validUser){
            console.log("NOT A VALID USER");
            throw new Error();
        }

        console.log("existing User", validUser);

        req.user = validUser;

        next();

    }catch(err){
        return res.status(401).send({"errorMsg": "Authorization failed"});
    }
}

module.exports = authMiddleware;