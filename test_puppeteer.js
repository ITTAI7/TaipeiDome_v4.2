import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://example.com');
    console.log(await page.title());
    await browser.close();
  } catch (error) {
    console.error('Puppeteer failed to launch:', error);
  }
})();
