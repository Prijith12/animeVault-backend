import User from "../models/user.js"

export const login=async(req,res)=>{
    try{
        const {email,name}=req.user;
        const existinguser= await User.findOne({email:email});
        if(existinguser){
            res.status(200).json({success:true,message:"login was sucessfull",premium:existinguser.premium});
        }else{
            const user=new User({
                email:email,
                username:name
            })
            await user.save()
            res.status(201).json({success:true,message:"user details has been added"})
        }
    }catch{
        return res.status(500).json({success:false,message:"internal error"})
    }
}