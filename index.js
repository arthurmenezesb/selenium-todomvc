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
        // await driver.get('http://todomvc.com/examples/angular2/');
        await driver.get('http://todomvc.com/examples/vue/');
        await driver.wait(webdriver.until.elementLocated(webdriver.By.css('input'))); // check if the page is rendered

        // create tasks
        for (let index = 0; index < 10; index++) {
            await driver.findElement(webdriver.By.css("input")).sendKeys('task ' + index, webdriver.Key.RETURN);
        }
        
        // await driver.findElement(webdriver.By.css("input")).sendKeys('task2', webdriver.Key.RETURN);
        // await driver.findElement(webdriver.By.css("input")).sendKeys('task3', webdriver.Key.RETURN);
        // await driver.findElement(webdriver.By.css("input")).sendKeys('task4', webdriver.Key.RETURN);

        // check the checkbox in the tasks
        let taskListElements = await driver.findElements(webdriver.By.className('view'));
        for (const tasksElement of taskListElements) {
            await tasksElement.findElement({ className: 'toggle' }).click();
        }

        await driver.findElement(webdriver.By.xpath("//a[contains(.,'Active')]")).click();

        await driver.findElement(webdriver.By.xpath("//a[contains(.,'Completed')]")).click();

        await driver.findElement(webdriver.By.xpath("//a[contains(.,'All')]")).click();

    } catch (err) {
        console.error(err);
    }
    finally {
        await driver.quit();
    }
})();