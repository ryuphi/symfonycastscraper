import { Authenticate } from 'src/common/interfaces';

const authenticate: Authenticate = function authenticate ({ username, password }) {
  return this.getPage(`https://symfonycasts.com/login`, async page => {
    await page.waitForSelector('input#email');
    
    const usernameInput = await page.$('input[name="_email"]');
    const passwordInput = await page.$('input[name="_password"]');
    
    await usernameInput.type(username, { delay: 100 });
    await passwordInput.type(password, { delay: 100 });
    
    const logInButtonSelector = await page.evaluate(() => {
      const { scraper } = window as any;
      
      const logInButton = scraper.findOneWithText({
        selector: 'button[name="_submit"]',
        text: 'Sign In'
      });
      
      if (! logInButton) {
        return '';
      }
      
      return logInButton
        .setscraperAttr('logInButton', 'logInButton')
        .getSelectorByscraperAttr('logInButton');
    });
    
    if (!logInButtonSelector) {
      throw new Error('Failed to auth');
    }
    
    const logInButton = await page.$(logInButtonSelector);
    
    await logInButton.click();
    
    await page.waitFor(2000);
  });
};

export { authenticate };
