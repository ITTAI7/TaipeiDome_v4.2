const cheerio = require('cheerio');
(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        const res = await fetch(baseUrl + 'UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22');
        const html = await res.text();
        const $ = cheerio.load(html);
        $('button#buy_btn').each((i, el) => {
            console.log($(el).attr('onclick'));
        });
    } catch(e) { console.error(e); }
})();
