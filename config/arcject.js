// import arcjet , { shield , detectBot,   tokenBucket   }from "@arcjet/node";
// import { ARCJECT_KEY , ARCJECT_ENV } from "./env.js";
// import dotenv from 'dotenv';
// dotenv.config();

// console.log("ARCJET_ENV:", ARCJECT_ENV);

// const aj = arcjet({
//   // Get your site key from https://app.arcjet.com and set it as an environment
//   // variable rather than hard coding.
//   key: ARCJECT_KEY,

//   // Set the environment - "development" or "production"
//   env: ARCJECT_ENV,
//   rules: [
//     // Shield protects your app from common attacks e.g. SQL injection
//     shield({ mode: "LIVE" }),
//     // Create a bot detection rule
//     detectBot({
//       mode: ARCJECT_ENV === 'production' ? "LIVE" : "DRY_RUN"   , // Blocks requests. Use "DRY_RUN" to log only
//       // Block all bots except the following
//       allow: [
//         "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
//         // Uncomment to allow these other common bot categories
//         // See the full list at https://arcjet.com/bot-list
//         //"CATEGORY:MONITOR", // Uptime monitoring services
//         //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
//       ],
//     }),
//     // Create a token bucket rate limit. Other algorithms are supported.
//     tokenBucket({
//       mode:ARCJECT_ENV === 'production' ? "LIVE" : "DRY_RUN",
//       refillRate: 5, // Refill 5 tokens per interval
//       interval: 10, // Refill every 10 seconds
//       capacity: 10, // Bucket capacity of 10 tokens
//     }),
//   ],
// });

// export default aj;
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";

// This checks if you are in dev mode
const isDev = process.env.ARCJET_ENV === "development";

const aj = arcjet({
  requireIP: false,
  key: process.env.ARCJET_KEY,
  log: console,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: isDev ? "DRY_RUN" : "LIVE", // Use DRY_RUN in dev to see logs without blocking
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;
