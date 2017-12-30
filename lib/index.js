import { Builder, By, until } from 'selenium-webdriver';
import util from 'util';

const exec = util.promisify(require('child_process').exec);

//
// Domain:
// - Show allowance spending via trends
// - Latest transactions
// - Basic budget update
//

const getPassword = async function getPasswordFromShell(command) {
  const { stdout, stderr } = await exec(command);
  if (stderr) {
    return new Error(stderr);
  }

  return stdout.trim();
};

const getSessionCookie = async function getSessionCookie(username, password) {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    const timeout = 5000;

    await driver.get('https://mint.intuit.com/login.event?task=L');
    await driver.wait(until.titleIs('Intuit Accounts - Sign In'), timeout);

    await driver.findElement(By.id('ius-userid')).sendKeys(username);
    await driver.findElement(By.id('ius-password')).sendKeys(password);
    await driver.findElement(By.id('ius-sign-in-submit-btn')).submit();
    await driver.wait(until.titleIs('Mint > Overview'), timeout);

    await driver.get('http://accounts.intuit.com');
    const cookie = await driver.manage().getCookie('ius_session');
    return cookie.value;
  } catch (error) {
    return error;
  } finally {
    await driver.quit();
  }
};

export { getPassword, getSessionCookie };
