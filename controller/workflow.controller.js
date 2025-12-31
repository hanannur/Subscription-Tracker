
import { serve } from '@upstash/workflow';
import dayjs from 'dayjs';
 import {createRequire} from 'module';
import { Subscription } from '../models/subscription.models.js';    
//import {  } from '../utils/email.templete.js';
// const require = createRequire(import.meta.url);
const REMINDERS=[7,5,2,1]

export const sendReminders= serve(async (req, res) => {
    const { subscriptionId}=  req.body;

    const subscription = await fetchSubscriptionId(context ,subscriptionId);
    res.status(200).json({ success: true, message: 'Reminders sent successfully' });


if (!subscription || subscription.status!='active') return;
 
const renewalDate= dayjs(subscription.renewalDate);
if(renewalDate.isBefore(dayjs())){
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`);
    return;
}

for (const daysBefore of REMINDERS){
    const reminderDate= renewalDate.subtract(daysBefore , 'day');
    
    if(reminderDate.isAfter(dayjs())){
        await sleepUntilReminder(context ,label ` ${daysBefore} days before reminder` , reminderDate.toDate());
    }
    await triggerReminder(context , `Reminder ${daysBefore} days before` , subscription);
}

    if(dayjs().isSame(reminderDate,'day')){
        await triggerReminder(context , label `${daysBefore} days before reminder` , subscription);
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

const triggerReminder = async (context, label , subscription) => {
    return await context.run(label, async () => {
        console.log(`Triggering ${label} reminder`);

        await sendEmailReminders({
             to: subscription.user.email,
             type: label, 
             subscription: subscription 
            
            });
    });
};



