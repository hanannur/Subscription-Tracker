import express from 'express';
import {PORT} from './config/env.js';
import userRouter from './routes/user.routes.js'; 
import authRouter from './routes/authroutes.js';
import subscriptionRouter from './routes/subscription.routes.js'; 
import { connectDB } from './database/mongodb.js';



const app = express();

app.use('/api/auth' , authRouter)
app.use('/api/users' , userRouter)
app.use('/api/subscription' , subscriptionRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, async() => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  await connectDB();
});   
export default app;