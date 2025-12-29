import { Router } from "express";   
const authRouter = Router();


authRouter.post('/sign-up', (req, res) => {
  // Authentication logic here
  res.send('Login route');
}); 

authRouter.post('/sign-in', (req, res) => {
  // Authentication logic here
  res.send('Login route');
}   );


authRouter.post('/sign-out', (req, res) => {
  // Logout logic here
  res.send('Logout route');
});
export default authRouter;