import { NextResponse } from "next/server";
import dbconnection from "../../../../utils/config/db";
import productModel from'../../../../utils/models/productModel';

await dbconnection();

export async function GET(response,{params}) {
    const {id}=await params;
    try {
        const product=await productModel.findById(id);
        return NextResponse.json({success:true,data:product});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false,message:"product not found"});
    }
    
}