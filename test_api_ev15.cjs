const cheerio = require('cheerio');
(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        let allCookies = new Map();
        
        const fetchHtml = async (url, method='GET', reqVer, auth, body='', referer=null) => {
             const cookieStr = Array.from(allCookies.entries()).map(([k,v])=>`${k}=${v}`).join('; ');
             let opts = { 
                 headers: { 
                     'Cookie': cookieStr, 
                     'User-Agent': 'Mozilla/5.0',
                 }, method, redirect: 'manual'
             };
             if(method === 'POST') {
                 opts.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                 opts.headers['X-Requested-With'] = 'XMLHttpRequest';
                 opts.headers['RequestVerificationToken'] = reqVer;
                 opts.headers['Authorization'] = auth;
                 if(referer) opts.headers['Referer'] = referer;
                 opts.headers['Origin'] = 'https://tix.ctbcsports.com';
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
             console.log(`FETCHED ${url}: ${res.status}, url=${res.url}, location=${res.headers.get('location')}`);
             return await res.text();
        };

        const page0 = await fetchHtml('UTK0101_', 'GET');
        const page1 = await fetchHtml('UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22', 'GET', '', '', '', baseUrl + 'UTK0101_');
        const $1 = cheerio.load(page1);
        const reqVer = $1('input[name="__RequestVerificationToken"]').attr('value') || '';
        const auth = $1('input[name="__JWtToken"]').attr('value') || '';

        // properly url encoded
        let body = new URLSearchParams({
            PRODUCT_ID: 'P16ANF0O',
            STARTDATE: '2026/05/22',
            SEASON_TICKET_ID: '',
            ItemMaxNumber: '4'
        }).toString();

        let html = await fetchHtml('UTK0201_/PerformanceListControl', 'POST', reqVer, auth, body, baseUrl + 'UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22');
        console.log(html.substring(0, 200));
        
    } catch(e) { console.error(e); }
})();
