AuthMate 

import { AuthMate } from 'authmate';

const auth = new AuthMate({
  baseURL: 'https://api.authmate.dev',
  apiKey: 'your-api-key'
});

auth.login({ email: 'test@example.com', password: '123456' })
  .then(console.log)
  .catch(console.error);
