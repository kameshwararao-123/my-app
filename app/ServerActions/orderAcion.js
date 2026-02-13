"use server"
import {auth} from '../auth';
import dbconnection from '../utils/config/db';

await dbconnection();
export async function orderAction() {
    try{
        const session=await auth();
        const res=await fetch(`http://localhost:3000/orders/${session.user.id}`);
        console.log("the data is:",await res);


        
    } catch (error) {
        console.log(error);
    }
}