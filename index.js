require('dotenv').config()
const puppeteer = require('puppeteer');

const myTasks = [
  // {
  //   day: '4',
  //   month: '5',
  //   from: '09:00',
  //   to: '17:40',
  //   description: "meetings"
  // }
];


(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    // devtools: true,
  });
  const page = await browser.newPage();
  await login()

  for (let dailyTask = 0; dailyTask < myTasks.length; dailyTask++) {
    const element = myTasks[dailyTask];
    await createRequest(element)
  }

  await browser.close();


  async function login() {
    await page.goto('https://personalwolke.at/webdesk3/login');
    await (await page.$("[name='userid']")).type(process.env.PW_USER)
    await (await page.$("[name='password']")).type(process.env.PW_PASSWORD)
    await (await page.$(".login-buttons .btn")).click()
  }


  async function createRequest({ day, month, year=2021, from, to, description="support tickets", type }) {
    await page.waitForNavigation();
    await page.waitForTimeout(100)
    await page.goto(`https://personalwolke.at/webdesk3/Zeitkorrektur$EM.proc?from_date=${day}.${month}.${year}`);
    await page.waitForTimeout(100)
    await (await page.$(".time-correction-from[type=text]")).type(from)
    await (await page.$(".time-correction-to[type=text]")).type(to)
    if (type !== 'present') {
      await page.select('select', '228')
      // TODO: catch loading
    }
    await (await page.$("textarea")).type(description)
    // await (await page.$('#wf_startRequest_button')).click() // <-submit request
  }
})();
