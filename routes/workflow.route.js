import {Router} from 'express';
import { sendReminders } from '../controller/workflow.controller.js';


const workflowRouter = Router();
console.log("Controller check:", sendReminders);
workflowRouter.post('/subscription/reminder', sendReminders.handler);

export default workflowRouter;

// import express from "express";
// import fetch from "node-fetch"; // or axios
// import QSTASH_TOKEN from "../config/env.js";    
// const router = express.Router();

// router.post("/subscription/reminder", async (req, res) => {
//   const subscriptionId = req.body.subscriptionId;

//   // Your QStash workflow URL
//   const workflowURL = "https://qstash.upstash.io/v1/publish/<WORKFLOW_ID>";

//   await fetch(workflowURL, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${QSTASH_TOKEN}`,
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ subscriptionId })
//   });

//   res.json({ success: true, message: "Workflow triggered via QStash" });
// });

// export default router;
