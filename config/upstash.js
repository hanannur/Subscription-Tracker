// import { Client as workflowClient } from '@upstash/qstash';  
 import { QSTASH_URL, QSTASH_TOKEN } from './env.js';

// export const workflowClient = new workflowClient({
//   baseurl: QSTASH_URL,
//   token: QSTASH_TOKEN,
// });
import { Client as QStashClient } from '@upstash/qstash';

export const workflowClient = new QStashClient({
  baseUrl: QSTASH_URL,
  token: QSTASH_TOKEN,
});
