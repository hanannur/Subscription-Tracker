import { Router } from "express";   
const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
    res.send('Subscription route');
});
subscriptionRouter.post('/', (req, res) => {
    // Create new subscription logic here
    res.send('Subscription created');
}); 

subscriptionRouter.put('/:id', (req,res)=>{
    res.send('Updated Subscription')
})

subscriptionRouter.get('/user/:id', (req,res)=>{
    res.send('Get user subscriptions')
})  ;


subscriptionRouter.get('/:id' , (req,res)=>{
    res.send('Get sub detail')
});

subscriptionRouter.delete('/:id' , (req,res)=>{
    res.send('Deleted')
});

subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL subscription' }));

subscriptionRouter.get('/upcoming-renewals', (req, res) => res.send({ title: 'GET upcoming renewals' }));

export default subscriptionRouter;


 
