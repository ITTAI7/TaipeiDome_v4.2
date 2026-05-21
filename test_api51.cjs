const cheerio = require('cheerio');

(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        const initRes = await fetch(baseUrl + 'UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
        let cookies = [];
        if (typeof initRes.headers.getSetCookie === 'function') {
            cookies = initRes.headers.getSetCookie();
        }
        let cookieStr = cookies.map(c => c.split(';')[0]).join('; ');
        
        let text = await initRes.text();
        const $ = cheerio.load(text);
        let reqVer = $('input[name="__RequestVerificationToken"]').attr('value') || '';
        let auth = $('input[name="__JWtToken"]').attr('value') || '';
        
        console.log("Cookies:", cookieStr);
        
        // Let's call PerformanceListControl? No wait, this is UTK0204_. Does it POST anything?
        // Let's directly go to UTK0205_ with these cookies and referer.
        const res2 = await fetch(baseUrl + 'UTK0205_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O&PLACE_ROW_ID=a117', {
             headers: {
                 'User-Agent': 'Mozilla/5.0',
                 'Cookie': cookieStr,
                 'Referer': baseUrl + 'UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O'
             }
        });
        
        const html2 = await res2.text();
        console.log("IndexOf TBL:", html2.indexOf('TBL'));
        if(html2.indexOf('TBL') < 0) console.log("Still no TBL!");
    } catch(e) { console.error(e); }
})();
