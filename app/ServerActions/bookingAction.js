"use server"
import dbconnection from '../utils/config/db';
import {auth} from '../auth';
import userModel from '../utils/models/user';
import bookingModel from '../utils/models/booking';
await dbconnection();
export async function bookingAction(bookingDetails) {
    console.log("the booking details are:",bookingDetails);
    const session= await auth();
    console.log("email chek",session.user.email);
    try {
        const user=await userModel.findOne({email:session.user.email});
        if(!user){
            return {success:false,message:"user doesn't exists"}
        }
        const userId=user._id.toString();
        const userbookingDetails=await bookingModel.create({
            startDate:bookingDetails.seleceddates.startDate,
            endDate:bookingDetails.seleceddates.endDate,
            price:bookingDetails.record.price,
            productname:bookingDetails.record.title,
            offer:bookingDetails.record.offer,
            image:bookingDetails.record.image,
            user:userId
        })
        await userModel.findByIdAndUpdate(
            userId,
                {$push:{bookings:userbookingDetails._id}},
                {new:true}
        )
        return {success:true}
    } catch (error) {
        console.log(error);
        return {success:false,message:"bokking not successful"}
    }
}