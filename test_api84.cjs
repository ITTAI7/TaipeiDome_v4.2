const cheerio = require('cheerio');
(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        let allCookies = new Map();
        
        const fetchHtml = async (url, method='GET', referer=null) => {
             const cookieStr = Array.from(allCookies.entries()).map(([k,v])=>`${k}=${v}`).join('; ');
             let opts = { 
                 headers: { 
                     'Cookie': cookieStr, 
                     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                     'Accept': '*/*',
                 }, 
                 redirect: 'manual' 
             };
             if(referer) opts.headers['Referer'] = referer;

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

        await fetchHtml('UTK0101_');
        await fetchHtml('UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22', 'GET', baseUrl + 'UTK0101_');
        
        const r3 = await fetchHtml('UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O', 'GET', baseUrl + 'UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22');
        console.log("R3 (UTK0204_) Status:", r3.status);

        // Call PerformanceListControl
        const r_list = await fetchHtml('PerformanceListControl?PRODUCT_ID=P16ANF0O', 'GET', baseUrl + 'UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
        console.log("PerformanceListControl Status:", r_list.status);

        let r4 = await fetchHtml("UTK0205_?PERFORMANCE_ID=P18UQBUZ&GROUP_ID=117&PERFORMANCE_PRICE_AREA_ID=P191N48J", 'GET', baseUrl + 'UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
        console.log("R4 Status:", r4.status, "Location:", r4.loc);
        if(r4.status === 200) {
            console.log("Index of TBL:", r4.html.indexOf("TBL"));
        } else {
            console.log(r4.html.substring(0, 300));
        }
    } catch(e) { console.error(e); }
})();
