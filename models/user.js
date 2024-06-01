import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true},
    premium: { type: Boolean, default: false },
    wishlist:[{
        malid:{type:Number},
        imageUrl:{type:String},
        title:{type:String},
    }],
    downloads:[
        {
            malid:{type:Number},
            imageUrl:{type:String},
            title:{type:String},
        }
    ]
});

const User=mongoose.model('User',UserSchema);
export default User;