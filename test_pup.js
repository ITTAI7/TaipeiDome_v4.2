import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.goto('https://ticket.tsghawks.com/', { waitUntil: 'networkidle0' });
  
  const activities = await page.evaluate(() => {
    const list = [];
    document.querySelectorAll('a, button').forEach(el => {
      const text = el.innerText || el.textContent;
      if (text && text.includes('購票')) {
          list.push({
             text: text.replace(/\n/g, ' '),
             href: el.href || '',
             html: el.outerHTML
          });
      }
    });
    return list;
  });
  
  console.log('Found buttons:', activities.length);
  activities.forEach(a => console.log(a.html));
  
  await browser.close();
})();
