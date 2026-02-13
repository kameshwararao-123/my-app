import { NextResponse } from "next/server";
import dbconnection from "../../../utils/config/db";
import userModel from "../../../utils/models/user";
import bookingModel from "../../../utils/models/booking";

await dbconnection();

export async function GET(request,{params}) {
    const {id}=await params;
    try {
        const user=await userModel.findById(id).populate('bookings');
        return NextResponse.json({success:true,user});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false,message:"user not found"});
    }
}