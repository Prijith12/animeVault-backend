import { connect } from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()
const connectDB = async () => {
  try {
    await connect(process.env.MongoDB_URL);
    console.log('MongoDB connected successfully');
    
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
