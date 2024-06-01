import { Router } from 'express';
import { isLoggedIn } from '../middleware/isAuth.js';
import { login } from '../controllers/authController.js';
import { addWishList } from '../controllers/wishlistController.js';
import { removeWishList } from '../controllers/wishlistController.js';
import { viewWishList } from '../controllers/wishlistController.js';
import { createOrder } from '../controllers/paymentController.js';
import { verifyPayment } from '../controllers/paymentController.js';
let router = Router();

router.post('/login',isLoggedIn,login);

router.post('/addWishList',isLoggedIn,addWishList);

router.post('/removeWishList',isLoggedIn,removeWishList);

router.post('/viewWishList',isLoggedIn,viewWishList);

router.post('/createOrder',isLoggedIn,createOrder)

router.post('/verifyPayment',isLoggedIn,verifyPayment);

router.get('/',async(req,res)=>{
    try{
        res.status(200).json({success:true})
    }catch(err){
        res.status(200).json({success:false,err})
    }
})

export default router;
