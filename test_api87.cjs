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
                     let sepIdx = pair.indexOf('=');
                     if (sepIdx !== -1) {
                         let k = pair.substring(0, sepIdx);
                         let v = pair.substring(sepIdx + 1);
                         allCookies.set(k, v);
                     }
                 });
             }
             return {status: res.status, loc: res.headers.get('location'), html: await res.text(), url: res.url};
        };

        await fetchHtml('UTK0101_');
        await fetchHtml('UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22', 'GET', baseUrl + 'UTK0101_');
        await fetchHtml('UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O', 'GET', baseUrl + 'UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22');
        let r4 = await fetchHtml("UTK0205_?PERFORMANCE_ID=P18UQBUZ&GROUP_ID=288&PERFORMANCE_PRICE_AREA_ID=P18V3RGX", 'GET', baseUrl + 'UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
        
        console.log("IndexOf Seat:", r4.html.indexOf("seat-empty"));
        let match = r4.html.match(/seat-empty/g);
        console.log("Empty seats match:", match ? match.length : 0);

        // Does it load dynamically?
        console.log(r4.html.includes("GET_SEAT") || r4.html.includes("GET_VIEWSEAT"));
        const fs = require('fs');
        fs.writeFileSync('utk0205_fetch.html', r4.html);
    } catch(e) { console.error(e); }
})();
