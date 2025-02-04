import mongoose from 'mongoose';


export const connectDB= async ()=>{
    try{
      const conn=  await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to the database ${process.env.MONGODB_URI}`);
    }catch(err){
        console.log('error in connecting to the database'+err);
    }
}