import User from "../models/user.js";

export const addWishList=async(req,res)=>{
    const {email}=req.user;
    const wishListItems=req.body.wishListItems;
    try{
        const user=await User.findOneAndUpdate({email:email},{
            $push:{
                wishlist:wishListItems
            }
        })
        if(!user) return res.status(404).json({success:false,message:"user not found"})
            res.status(200).json({success:true,message:"wishList added"})
    }catch(err){
        res.status(500).json({success:false,message:err.message})
    }
}

export const viewWishList=async(req,res)=>{
    const {email}=req.user;
    try{
        const user=await User.findOne({email})
        if(user){
            res.status(200).json(user.wishlist)
        }else{
            return res.status(404).json({success:false,message:"User not found"})
        }
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}

export const removeWishList=async(req,res)=>{
    const {email}=req.user;
    const {mal_id}=req.body
    try{
        const result=await User.findOneAndUpdate({email},{
            $pull:{
                wishlist:{malid:mal_id}
            }
        });
        if(!result) return res.status(404).json({success:false,message:"USer not found"});

        res.status(200).json({success:true,message:"Successfully removed from wishlist"});
    }catch(err){
        return res.status(500).json({success:false,message:err.message});
    }
}