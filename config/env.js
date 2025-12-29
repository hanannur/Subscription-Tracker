import dotenv from 'dotenv';

dotenv.config(); // loads .env from project root

export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';    
export const JWT_SECRET = process.env   .JWT_SECRET || 'your_jwt_secret_key';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

