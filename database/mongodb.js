import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();  


import { MONGO_URI , NODE_ENV } from "../config/env.js" ;

if(!MONGO_URI){
  throw new Error ('Please define the MONGODB_URI enviroment variable')
}
export const connectDB = async () => {  
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};