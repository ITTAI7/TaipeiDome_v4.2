const cheerio = require('cheerio');
(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        let allCookies = new Map();
        
        const fetchHtml = async (url, method='GET', body='') => {
             const cookieStr = Array.from(allCookies.entries()).map(([k,v])=>`${k}=${v}`).join('; ');
             let opts = { 
                 headers: { 
                     'Cookie': cookieStr, 
                     'User-Agent': 'Mozilla/5.0',
                 }, method
             };
             if(method === 'POST') {
                 opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                 opts.body = body;
             }
             const res = await fetch(baseUrl + url, opts);
             let setCookies = res.headers.getSetCookie();
             if(setCookies){
                 setCookies.forEach(c=>{
                     let pair = c.split(';')[0];
                     let sepIdx = pair.indexOf('=');
                     if (sepIdx !== -1) {
                         let k = pair.substring(0, sepIdx);
                         let v = pair.substring(sepIdx + 1);
                         allCookies.set(k, v);
                     }
                 });
             }
             return await res.text();
        };

        await fetchHtml('UTK0101_');
        let html = await fetchHtml('UTK0201_/PerformanceListControl', 'POST', 'PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22&SEASON_TICKET_ID=&ItemMaxNumber=4');
        console.log(html.substring(0, 500));
        let m = html.match(/PERFORMANCE_ID=([A-Z0-9]+)/);
        if(m) console.log("FOUND P_ID:", m[1]);
    } catch(e) { console.error(e); }
})();
