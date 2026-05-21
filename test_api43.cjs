const cheerio = require('cheerio');

(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        const initUrl = baseUrl + 'UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22';
        const initRes = await fetch(initUrl);
        let cookies = [];
        if (typeof initRes.headers.getSetCookie === 'function') {
            cookies = initRes.headers.getSetCookie();
        }
        const cookieStr = cookies.map(c => c.split(';')[0]).join('; ');
        
        // Let's get UTK0205_
        const url = baseUrl + 'UTK0205_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O&PLACE_ROW_ID=a117';
        const res = await fetch(url, { headers: { Cookie: cookieStr }});
        const text = await res.text();
        const $ = cheerio.load(text);
        
        console.log("Empty seats inside table:", $('td[style*="seat-empty"]').length);
        console.log("Has TBL:", $('#TBL').length);
    } catch(e) { console.error(e); }
})();
