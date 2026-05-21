const puppeteer = require('puppeteer');
(async () => {
    let browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
    let page = await browser.newPage();
    page.on('request', request => {
        if(request.url().includes('UTK0205_')) console.log("Request URL:", request.url());
    });
    
    await page.goto("https://tix.ctbcsports.com/BROTHERS/UTK0101_", {waitUntil: 'networkidle2'});
    await page.goto("https://tix.ctbcsports.com/BROTHERS/UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22", {waitUntil: 'networkidle2'});
    await page.goto("https://tix.ctbcsports.com/BROTHERS/UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O", {waitUntil: 'networkidle2'});
    
    // Click saleTr
    await page.evaluate(() => {
        document.querySelector('tr.saleTr').click();
    });
    
    await new Promise(r => setTimeout(r, 3000));
    await browser.close();
})();
