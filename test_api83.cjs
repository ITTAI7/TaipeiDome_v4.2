const puppeteer = require('puppeteer');
(async () => {
    let browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
    let page = await browser.newPage();
    page.on('request', request => {
        if (request.resourceType() === 'xhr' || request.resourceType() === 'fetch' || request.resourceType() === 'document') {
           console.log("Req:", request.method(), request.resourceType(), request.url());
        }
    });
    
    await page.goto("https://tix.ctbcsports.com/BROTHERS/UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O", {waitUntil: 'networkidle2'});
    
    console.log("---- Clicking ----")
    await page.evaluate(() => {
        document.querySelector('tr.saleTr').click();
    });
    
    await new Promise(r => setTimeout(r, 3000));
    await browser.close();
})();
