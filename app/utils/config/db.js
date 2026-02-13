import mongoose from 'mongoose';

const dbconnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb connected successfully");
        
    } catch (error) {
        console.log(error)
    }
}

export default dbconnection;