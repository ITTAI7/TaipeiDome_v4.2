const cheerio = require('cheerio');
(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        let allCookies = new Map();
        
        const fetchHtml = async (url, method='GET', reqVer, auth, body='') => {
             const cookieStr = Array.from(allCookies.entries()).map(([k,v])=>`${k}=${v}`).join('; ');
             let opts = { 
                 headers: { 
                     'Cookie': cookieStr, 
                     'User-Agent': 'Mozilla/5.0',
                 }, method
             };
             if(method === 'POST') {
                 opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                 opts.headers['X-Requested-With'] = 'XMLHttpRequest';
                 opts.headers['RequestVerificationToken'] = reqVer;
                 opts.headers['Authorization'] = auth;
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

        const page0 = await fetchHtml('UTK0101_', 'GET', '', '');
        const $0 = cheerio.load(page0);
        const reqVer = $0('input[name="__RequestVerificationToken"]').attr('value') || '';
        const auth = $0('input[name="__JWtToken"]').attr('value') || '';

        let html = await fetchHtml('UTK0201_/PerformanceListControl', 'POST', reqVer, auth, 'PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22&SEASON_TICKET_ID=&ItemMaxNumber=4');
        console.log(html.substring(0, 500));
        let m = html.match(/PERFORMANCE_ID=([A-Z0-9]+)/);
        if(m) console.log("FOUND P_ID:", m[1]);
        else console.log("Not found in match", html.length);
    } catch(e) { console.error(e); }
})();
