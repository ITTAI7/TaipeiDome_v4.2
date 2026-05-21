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
        const r3 = await fetchHtml('UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O', 'GET', baseUrl + 'UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22');
        
        const $ = cheerio.load(r3.html);
        let targetZoneUrl = null;
        $('tr.saleTr').each((i, el) => {
           const zoneName = $(el).find('td[data-title="票區："]').text().trim();
           if(zoneName === "B1內野120區") {
               const rel = $(el).attr('rel');
               if(rel) {
                   const aID = rel.replace('s', 'a');
                   const aTag = $('#' + aID);
                   const href = aTag.attr('href'); // javascript:Send('0205', 'P18UQBUZ', 'P191NABJ', '191', '9');
                   if(href) {
                      const m = href.match(/'0205',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)'/);
                      if(m) targetZoneUrl = "UTK0205_?PERFORMANCE_ID=" + m[1] + "&GROUP_ID=" + m[3] + "&PERFORMANCE_PRICE_AREA_ID=" + m[2];
                   }
               }
           }
        });
        
        console.log("Target URL:", targetZoneUrl);
        if (targetZoneUrl) {
            let r4 = await fetchHtml(targetZoneUrl, 'GET', baseUrl + 'UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
            let m = r4.html.match(/seatStr\s*=\s*'([^']*)'/);
            if(m) {
                let parts = m[1].split('.');
                let emptyStatus = parts.filter(p => !!p && p.includes(',,'));
                let nonEmptyStatus = parts.filter(p => !!p && !p.includes(',,'));
                console.log("Total parts:", parts.length);
                console.log("Empty status components:", emptyStatus.length);
                console.log("Non-empty status components:", nonEmptyStatus.length);
                if(nonEmptyStatus.length > 0) {
                    console.log("Sample non-empty:", nonEmptyStatus.slice(0,5));
                }
            } else {
                console.log("seatStr not found!");
            }
        }
    } catch(e) { console.error(e); }
})();
