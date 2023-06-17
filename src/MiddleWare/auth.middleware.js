import userModel from "../../DB/models/user.model.js";
import { verfiyToken } from "../services/generateAndVerfiyToken.js";

export const auth =  async (req,res,next)=>{

    const {authorization} =req.headers;

    if(!authorization?.startsWith(process.env.BEARERKEY)){
        return res.json({message: "invalid bearer key"})
    }
    const token = authorization.split(process.env.BEARERKEY)[1];
    if(!token){    //بعملها عشان اذا كان باعث بس البيرر توكن بدون التوكن 
        return res.json({message: "invalid token"})
    }
    const decoded = verfiyToken(token)
    const authUser = await userModel.findById(decoded.id).select('username email');
    if(!authUser){
        return res.status(401).json({message: "not register account "})
    }
    req.id = decoded.id 
    next()

    //بوخذ الاي دي وبروح مباشرة على فنكشن البروفايل باليوزر كنترولر
  //  return res.json(decoded)

}