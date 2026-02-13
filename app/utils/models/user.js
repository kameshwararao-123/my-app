import mongoose from 'mongoose';

const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    bookings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'booking'
    }]
})

const userModel=mongoose.models.user||mongoose.model('user',userschema);

export default userModel;