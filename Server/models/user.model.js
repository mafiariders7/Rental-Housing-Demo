import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
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
    avatar:{
        type:String,
        required:true,
        default:"https://institutcommotions.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-1.png"
    },
    
},{timestamps:true});

const User = mongoose.model('User' , userSchema);
export default User;