import mongoose from 'mongoose';

const productschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    amenities:{
        type:[String],
        default:['Ac','Greyser','Tv','wi-fi','Elevator','Break-fast'],
        set:function(amenities){
            const defaultvalues=['Ac','Greyser','Tv','wi-fi','Elevator','Break-fast'];
            if(typeof amenities==='string'){
                amenities=amenities.split(',').map(item=>item.trim());
            }
            return Array.from(new Set([...defaultvalues,...amenities]));
        }
    }
})

const ProductModel=mongoose.models.product||mongoose.model('product',productschema);
export default ProductModel;