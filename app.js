import express from 'express';
import {PORT} from './config/env.js';
import userRouter from './routes/user.routes.js'; 
import authRouter from './routes/authroutes.js';
import subscriptionRouter from './routes/subscription.routes.js'; 
import { connectDB } from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  

app.use('/api/auth' , authRouter)
app.use('/api/users' , userRouter)
app.use('/api/subscription' , subscriptionRouter)
app.use(errorMiddleware)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, async() => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  await connectDB();
});   
export default app;