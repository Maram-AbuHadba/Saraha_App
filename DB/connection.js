
import mongoose from 'mongoose';

const connectDB = async ()=>{
    return await mongoose.connect(process.env.DB_LOCAL)
    .then(()=>{
        console.log("connect to db ")
    }).catch((err)=>{
        console.log(`Error connecting to db ${err}`)
    })
}

export default connectDB;