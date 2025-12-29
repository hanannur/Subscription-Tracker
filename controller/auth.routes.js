import { Router } from "express";   

import { signUp , signin , signout } from "../controller/auth.controller.js";  

const authRouter = Router();



authRouter.post('/signup' , signUp) ;
authRouter.post('/sign-in' , signin) ;
authRouter.post('/sign-out' , signout) ;

export default authRouter;