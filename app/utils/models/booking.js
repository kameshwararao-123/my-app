import mongoose from 'mongoose';

const bookingschema=new mongoose.Schema({
    startDate:{
        type:String,
        required:true
    },
    endDate:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    offer:{
        type:String,
    },
    image:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const bookingModel=mongoose.models.booking||mongoose.model('booking',bookingschema);

export default bookingModel;