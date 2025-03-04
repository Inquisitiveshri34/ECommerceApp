import jwt from "jsonwebtoken"
import { wrapAsync } from "../utils/wrapAsync.js"


const authUser = wrapAsync(async(req,res,next) => {
    const token = req.headers.authorization.split(" ")[1] || req.cookies.token;
    if(!token){
        return res.status(401).send({error:"Unauthorised User"})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
})

export {authUser}