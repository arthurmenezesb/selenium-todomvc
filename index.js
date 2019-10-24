const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

(async function example() {
    let driver = await new webdriver.Builder()
        .withCapabilities(webdriver.Capabilities.chrome())
        .build();
    try {
        await driver.get('http://www.google.com/ncr');
        await driver.findElement(webdriver.By.name('q')).sendKeys('webdriver', webdriver.Key.RETURN);
        await driver.wait(webdriver.until.titleIs('webdriver - Google Search'), 1000);
    } catch (err) {
        console.error(err);
    }
    finally {
        await driver.quit();
    }
})();