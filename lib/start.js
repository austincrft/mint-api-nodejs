import { getPassword, getSessionCookie } from './index';

(async () => {
  const username = 'austincrft@gmail.com';
  const password = await getPassword('lpass show --password Mint');
  const cookie = await getSessionCookie(username, password);
})();
