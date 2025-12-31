import express from 'express';
import {PORT} from './config/env.js';
import userRouter from './routes/user.routes.js'; 
import authRouter from './controller/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js'; 
import { connectDB } from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjectMiddleware from './middleware/arcject.middleware.js';
import workflowRouter from './routes/workflow.route.js';
import dotenv from 'dotenv';
dotenv.config();  

const app = express();
app.set("trust proxy", true);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  
app.use(arcjectMiddleware)


app.use('/api/auth' , authRouter)
app.use('/api/users' , userRouter)
app.use('/api/subscription' , subscriptionRouter)
app.use('/api/workflow' , workflowRouter)

app.use(errorMiddleware)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, async() => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  await connectDB();
});   
export default app;