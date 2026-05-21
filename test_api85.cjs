const puppeteer = require('puppeteer');
(async () => {
    let browser = await puppeteer.launch({headless: true, args:['--no-sandbox']});
    let page = await browser.newPage();
    page.on('response', resp => {
        if(resp.url().includes('UTK0205_')) {
            console.log("R4 Status:", resp.status());
            if (resp.status() === 302) {
               console.log("Loc:", resp.headers()['location']);
            }
        }
    });
    
    await page.goto("https://tix.ctbcsports.com/BROTHERS/UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O", {waitUntil: 'networkidle2'});
    console.log("---- Clicking ----")
    let hrefs = await page.evaluate(() => {
        let els = document.querySelectorAll('tr.saleTr');
        let arr = [];
        els.forEach(el => arr.push(el.getAttribute('rel')));
        return arr;
    });
    console.log(hrefs);
    if(hrefs.length > 0) {
       await page.evaluate(() => {
           document.querySelector('tr.saleTr').click();
       });
       await new Promise(r => setTimeout(r, 4000));
       console.log("Current URL:", page.url());
       const empty = await page.evaluate(() => document.querySelectorAll('td[style*="seat-empty"]').length);
       console.log("Empty seats found via puppeteer:", empty);
    }
    
    await browser.close();
})();
