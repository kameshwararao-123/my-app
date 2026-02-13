"use server"

import dbconnection from '../utils/config/db';
import userModel from '../utils/models/user';

export async function  registerAction(registerDetails) {
    await  dbconnection();
    console.log("register details",registerDetails);
    try {
        await userModel.create({
            name:registerDetails.name,
            email:registerDetails.email,
            password:registerDetails.password
        });
        return {success:true}
    } catch (error) {
        console.log(error)
    }

}