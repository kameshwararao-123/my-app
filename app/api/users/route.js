import { NextResponse } from "next/server";
import dbconnection from "../../utils/config/db"
import userModel from '../../utils/models/user';

await dbconnection();
export async function GET() {
    try {
        const users=await userModel.find({role:{$ne:'admin'}},{password:0});
        return NextResponse.json({success:true,users});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false,message:"fetching is failed"});
    }
}