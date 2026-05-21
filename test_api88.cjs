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
        
        let m = r4.html.match(/seatStr\s*=\s*'([^']*)'/);
        if(m) {
            console.log("Found seatStr. length:", m[1].length);
            let parts = m[1].split('.');
            console.log("Parts count:", parts.length);
            console.log(parts[parts.length-2]);
        }
        
        // Also let's find the Javascript that loads the real empty seats
        // look for "GET_SEAT" in r4.html
        let doc = cheerio.load(r4.html);
        let scripts = doc('script');
        scripts.each((i, s) => {
            let txt = doc(s).html();
            if(txt && txt.includes('DoPost') || txt && txt.includes('GET_SEAT')) {
                console.log(txt.substring(0, 200));
            }
        });
        
    } catch(e) { console.error(e); }
})();
