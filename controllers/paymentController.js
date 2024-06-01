import dotenv from 'dotenv'
import Razorpay from 'razorpay'
import User from '../models/user.js';
import { createHmac } from 'node:crypto';


dotenv.config()
let instance = new Razorpay({ key_id:process.env.KEY_ID, key_secret:process.env.KEY_SECRET});

export const createOrder=(req,res)=>{
    const {amount,receipt}=req.body
    instance.orders.create({
        amount: amount*100,
        currency: "INR",
        receipt: ""+receipt,
        },(err,order)=>{
            if(err){
            res.status(500).json({success:false,message:err})
            }else{
                res.status(200).json({success:true,order})
                console.log(order);
            }
        })  
}

export const verifyPayment = (req, res) => {
    const { order_id, payment_id, signature } = req.body;
  
    try {
      var hmac = createHmac('sha256', process.env.KEY_SECRET);
      hmac.update(order_id + "|" + payment_id);
      hmac = hmac.digest('hex');
  
      console.log(hmac);
      console.log(signature);
  
      if (hmac === signature) {
        console.log("HMAC verification successful");
  
        User.findOneAndUpdate(
          { email: req.user.email },
          { $set: { premium: true } },
          { new: true }
        )
          .then(updatedUser => {
            if (!updatedUser) {
              res.status(404).json({ success: false, message: 'User not found' });
            } else {
              console.log("User premium status updated successfully");
              res.status(200).json({ success: true, message: 'Premium activated successfully' });
            }
          })
          .catch(error => {
            console.error('Error updating user premium:', error);
            res.status(500).json({ success: false, message: 'Failed to activate premium' });
          });
      } else {
        console.log("HMAC verification unsuccessful");
        res.status(400).json({ success: false, message: 'HMAC verification failed' });
      }
    } catch (error) {
      console.error('Error in verifyPayment:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }