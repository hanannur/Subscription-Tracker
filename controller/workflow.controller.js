
import { serve } from '@upstash/workflow';
import dayjs from 'dayjs';
 import {createRequire} from 'module';
import { Subscription } from '../models/subscription.models.js';    

// const require = createRequire(import.meta.url);
const REMINDERS=[7,5,2,1]

export const sendReminders= serve(async (req, res) => {
    const { subscriptionId}=  req.body;

    const subscription = await fetchSubscriptionId(context ,subscriptionId);
    res.status(200).json({ success: true, message: 'Reminders sent successfully' });


if (!subscription || subscription.status!='active') return
 
const renewalDate= dayjs(subscription.renewalDate);
if(renewalDate.isBefore(dayjs())){
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`);
    return;
}

for (const daysBefore of REMINDERS){
    const reminderDate= renewalDate.subtract(daysBefore , 'day');
    
    if(reminderDate.isAfter(dayjs())){
        await sleepUntilReminder(context `Reminder ${daysBefore} days before` , reminderDate.toDate());
    }
    await triggerReminder(context , `Reminder ${daysBefore} days before`);
}

});

const fetchSubscriptionId= async (context, subscriptionId) => {
    // Simulate fetching subscription from database
    return await context.run('get Subscription' , ()=>{
        return Subscription.findById(subscriptionId).populate('user' , 'email name');
    });
}  

const sleepUntilReminder= async (reminderDate) => {
    console.log(`Sleeping until reminder date: ${reminderDate.toString()}`);
    await context.sleepUntil(label , Date.toDate());
}

const triggerReminder = async (context, label) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);
    });
};



