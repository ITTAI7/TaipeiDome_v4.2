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
        
        const fetchHtml = async (url) => {
             const res = await fetch(url, { headers: { Cookie: cookieStr }});
             return res.text();
        };

        // First need to POST PerformanceListControl, maybe?
        const reqVer = (await fetchHtml(initUrl)).match(/__RequestVerificationToken[^>]+value="([^"]+)"/)?.[1];
        // Maybe we need to load UTK0204_ first to get the session ready?
        await fetchHtml(baseUrl + 'UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
        
        // Then UTK0205_
        const text = await fetchHtml(baseUrl + 'UTK0205_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O&PLACE_ROW_ID=a117');
        
        require('fs').writeFileSync('utk0205_v2.html', text);
        console.log("Written", text.length);
    } catch(e) { console.error(e); }
})();
