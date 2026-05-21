const cheerio = require('cheerio');

(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        let allCookies = new Map();
        
        const fetchHtml = async (url, method='GET', body=null) => {
             const cookieStr = Array.from(allCookies.entries()).map(([k,v])=>`${k}=${v}`).join('; ');
             let opts = { headers: { Cookie: cookieStr, 'User-Agent': 'Mozilla/5.0' }, redirect: 'manual' };
             if(method==='POST'){ 
                 opts.method = 'POST'; 
                 opts.body = body;
                 opts.headers['Content-Type']='application/x-www-form-urlencoded';
             }
             const res = await fetch(baseUrl + url, opts);
             let setCookies = res.headers.getSetCookie();
             if(setCookies){
                 setCookies.forEach(c=>{
                     let pair = c.split(';')[0];
                     let [k,v] = pair.split('=');
                     allCookies.set(k, v);
                 });
             }
             return {status: res.status, loc: res.headers.get('location'), html: await res.text(), url: res.url};
        };

        // 1. UTK0101_
        await fetchHtml('UTK0101_');
        // 2. UTK0201_
        await fetchHtml('UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22');
        // 3. UTK0204_
        await fetchHtml('UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
        
        // 4. UTK0205_
        let res4 = await fetchHtml("UTK0205_?PERFORMANCE_ID=P18UQBUZ&GROUP_ID=117&PERFORMANCE_PRICE_AREA_ID=P191N48J");
        console.log("Status:", res4.status, "Location:", res4.loc);
        console.log(res4.html.substring(0, 300));
    } catch(e) { console.error(e); }
})();
