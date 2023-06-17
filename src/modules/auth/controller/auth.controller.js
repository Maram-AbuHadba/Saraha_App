import userModel from "../../../../DB/models/user.model.js";
import { generateToken, verfiyToken } from "../../../services/generateAndVerfiyToken.js";
import { compare, hash } from "../../../services/hashAndCompare.js";
import { sendEmail } from "../../../services/sendEmail.js";
import { loginSchema, signupSchema } from "../auth.validation.js";


export const signup = async (req,res)=>{

  //  const validationResult = signupSchema.validate(req.body,{abortEarly:false});
  //  if(validationResult.error){
  //      return res.json(validationResult)
  //  }

    const {userName, email , password } = req.body;
    const user = await userModel.findOne({email: email});
    if(user){
        return res.status(409).json({message : "email already exists"})
    }
    const hashPassword = hash(password)

    const token = generateToken({email}, process.env.EMAIL_TOKEN)
    const link = `http://localhost:3000/auth/confirmEmail/${token}` 
    await sendEmail(email , 'confirm email', `<a href="${link}"> verify your email </a>`)
    const createUser = await userModel.create({userName:userName, email:email , password:hashPassword})
    return res.status(201).json({message : "User Create Done" ,user:createUser._id})
}

export const confirmEmail = async (req , res )=>{

    const {token} = req.params;
    const decoded = verfiyToken(token, process.env.EMAIL_TOKEN)
    const user = await userModel.updateOne({email:decoded.email}, {confirmEmail: true})
   // return res.json({message :"your email is confirmed , you can login! "})
    //ممكن نكتبلو بس يعمل كونفيرم يحولنا لموقع معين 
    return res.redirect('https://www.google.com')
}


export const signin = async (req,res)=>{
 //   const validationResult = loginSchema.validate(req.body,{abortEarly:false});
  //  if(validationResult.error){
    //    return res.json(validationResult)
   // }
    const { email , password } = req.body;
    const user = await userModel.findOne({email: email});
    if(!user){
        return res.status(404).json({message : "email not exists"})
    }
    else {
         if(!user.confirmEmail){
            return res.json({message : "please verify your email"})
         }
        const match = compare(password, user.password)
        if(!match){
            return res.json({message : "invalid password"})
        }else{
            const token = generateToken({id : user._id})
            return res.status(200).json({message : "exists" , token})
        }
    }   
}


