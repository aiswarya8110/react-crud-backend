const jwt = require("jsonwebtoken");
const { User } = require("../models/models");
const authMiddleware = async(req, res, next)=>{
    try{
        const { token }= req.cookies;

        if(!token){
            throw new Error();
        }

        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const validUser = await User.findOne({token: token});
        if(!validUser){
            throw new Error();
        }

        req.user = validUser;

        next();

    }catch(err){
        return res.status(401).send({"errorMsg": "Authorization failed"});
    }
}

module.exports = authMiddleware;