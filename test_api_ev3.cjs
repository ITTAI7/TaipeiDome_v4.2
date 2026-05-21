const cheerio = require('cheerio');
(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        let allCookies = new Map();
        
        const fetchHtml = async (url, referer=null) => {
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

             const res = await fetch(url.startsWith('http') ? url : baseUrl + url, opts);
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
        let r1 = await fetchHtml('UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22', baseUrl + 'UTK0101_');
        
        const $ = cheerio.load(r1.html);
        console.log("Looking for PERFORMANCE_ID in UTK0201_");
        
        let pIds = [];
        $('table.ss tbody tr').each((i, el) => {
            if($(el).text().includes('臺北大巨蛋')) {
                let btn = $(el).find('button#buy_btn');
                if(btn.length > 0) {
                    let onclick = btn.attr('onclick') || '';
                    let m = onclick.match(/UTK0204_\?PERFORMANCE_ID=([A-Z0-9]+)/);
                    if(m) pIds.push(m[1]);
                }
            }
        });
        console.log("Found performance IDs:", pIds);
        
    } catch(e) { console.error(e); }
})();
