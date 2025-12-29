import { Router } from "express";
const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send('User route');
});
userRouter.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID: ${userId}`);
}    ); 

userRouter.post('/', (req, res) => {
    // Create new user logic here
    res.send('User created');
}); 
userRouter.put('/:id', (req, res) => {
    const userId = req.params.id;       
});
userRouter.delete('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Deleted User ID: ${userId}`);
}    );     
export default userRouter;