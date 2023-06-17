import userModel from "../../../../DB/models/user.model.js";
import messageModel from "../../../../DB/models/message.model.js";


export const getMessages = async (req,res)=>{

    const messagesList = await messageModel.find({recieverId:req.id})
    return res.json({message : "sucess", messagesList})
}

export const sendMessage = async (req,res)=>{ 
    const {recieverId} = req.params;
    const {message} = req.body;

    const user = await userModel.findById(recieverId);
    if(!user){
        return res.status(404).json({message: "invalid account id"})
    }
    const createMessage = await messageModel.create({recieverId : recieverId , message : message})
    return res.json({message :"success" , createMessage});

    
}

export const deleteMessages = async (req, res) =>{
    const id = req.id ;
    const {messageId} = req.params
   // return res.json(messageId)

   const message = await messageModel.deleteOne({_id:messageId , recieverId:id})
   if(message.deletedCount == 0){
    return res.status(400).json({message : " invalid user id or message id "})
   }
   return res.json({message : "success , message deleted!"})

}