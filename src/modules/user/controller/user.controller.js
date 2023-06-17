import userModel from "../../../../DB/models/user.model.js";
import cloudinary from "../../../services/cloudinary.js";

export const profile = (req,res)=>{
    
    return res.json({message : "profile"})
}


export const profilePic = async (req,res)=>{
    
    if(!req.file){
        return res.status(404).json({message: "file is required"})
    }

   // const imageUrl = req.file.destination + '/' + req.file.filename ;
   // res.json(req.id) 

   const {secure_url} =await cloudinary.uploader.upload(req.file.path , {folder: `saraha/user/${req.id}`});
   return res.json(secure_url)
   const user = await userModel.updateOne({_id:req.id},{profilePic:secure_url});
    return res.status(200).json({message:"profile updated successfully"})
}