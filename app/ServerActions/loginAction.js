"use server"
import { signIn } from "../auth";
import dbconnection from "../utils/config/db";

export async function loginAction(loginDetails) {
    await dbconnection();
    console.log("login detials",loginDetails);
    try {
        const res=await signIn("credentials",{
            email:loginDetails.email,
            password:loginDetails.password,
            redirect:false
        });
        return {success:true};
    } catch (error) {
        return {
            success: false,
            message: "Invalid email or password"
        };
    }
}