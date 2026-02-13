import {NextResponse} from 'next/server';
import dbconnection from '../../../utils/config/db';
import { writeFile } from 'fs/promises';
import ProductModel from '../../../utils/models/productModel';
import path from 'path';

await dbconnection();
export async function GET() {
    try {
        const response=await ProductModel.find({});
        return NextResponse.json({success:true,message:"fetched succefully",data:response});
    } catch (error) {
        console.log(error);
        return NextResponse.json("failed to fetca resorts data");
    }
}
export async function POST(request) {
    const data=await request.formData();
    const title=data.get('title');
    const price=data.get('price');
    const offer=data.get('offer');
    const amenities=data.get('amenities');
    const description=data.get('description');
    const image=data.get('image');

    //for image storing we first convert into buffer and next path
    const bufferdata=await image.arrayBuffer();
    const buffer=Buffer.from(bufferdata);
    // for where u store the images so u must create a path
    const imagepath=path.join(process.cwd(),'public','uploads',image.name);
    try {
        await writeFile(imagepath,buffer);
        const newproduct=await ProductModel({
            title,
            price,
            amenities,
            offer,
            description,
            image:`/uploads/${image.name}`
        });
        await newproduct.save();
        return NextResponse.json({success:true,message:"Resort details added successfully",newproduct});
    } catch (error) {
        console.log(error);
        return NextResponse.json({success:false,message:"fail to add"});
    }
}