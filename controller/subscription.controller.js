import { workflowClient } from "../config/upstash.js";
import {Subscription} from "../models/subscription.models.js";
import { serve } from "@upstash/workflow"; 
import { SERVER_URL } from "../config/env.js";


export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body, user: req.user._id

    });

    const {workflowRunID}=await workflowClient.trigger({
      url: `${SERVER_URL}/api/workflow/subscription/reminder`,
      body: { subscription:subscription.id },
      headers:{
        'content-type': 'application/json',
      }
    });
    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: {subscription , workflowRunID}
    });
  } catch (error) {
    next(error);
  } 
}