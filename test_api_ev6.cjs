const cheerio = require('cheerio');
(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        const res = await fetch(baseUrl + 'UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22');
        const html = await res.text();
        const $ = cheerio.load(html);
        $('script').each((i, el) => {
            let txt = $(el).html();
            if(txt && txt.includes('GET_')) {
                console.log(txt.substring(0, 500));
            }
        });
    } catch(e) { console.error(e); }
})();
