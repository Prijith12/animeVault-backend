export const isLoggedIn=(req,res,next)=>{
    console.log(req.body);
    if(req.body.isAuthenticated){

        req.user=req.body.user
        next()
    }else{
        return res.status(401).json({success:false,message:"unauthorized"});
    }
}

