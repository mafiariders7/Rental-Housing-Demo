import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        reqired: true,
    },
    address: {
        type: String,
        reqired: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        reqired: true,
    },
    bedrooms: {
        type: Number,
        reqired: true,
    },
    furnished:{
        type:Boolean,
        reqired:true,
    },
    parking:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        reqired:true,
    },
    offer:{
        type:Boolean,
        required:true,
    },
    imageUrls:{
        type:Array,
        required:true,
    },
    userRef:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
},{timestamps:true})

const Listing  = mongoose.model('Listing',schema);
export default Listing;