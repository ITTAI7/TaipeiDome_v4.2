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
                     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                 }, redirect: 'manual' 
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
             return {status: res.status, html: await res.text()};
        };

        await fetchHtml('UTK0101_');
        await fetchHtml('UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22', 'GET', baseUrl + 'UTK0101_');
        const r3 = await fetchHtml('UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
        
        let mapObjUrl = r3.html.match(/imgs2.utiki.com.tw.*?_live\.map/);
        if(!mapObjUrl) return console.log("Missing map URL");
        mapObjUrl = 'https://' + mapObjUrl[0];

        let rMap = await fetchHtml(mapObjUrl);
        const mapDoc = cheerio.load(rMap.html);

        const r3Doc = cheerio.load(r3.html);
        
        const testZones = [];
        r3Doc('tr.saleTr').each((i, el) => {
           let zoneName = r3Doc(el).find('td[data-title="票區："]').text().trim();
           let rel = r3Doc(el).attr('rel');
           if(rel) {
               let aID = rel.replace('s', 'a');
               let areaEl = mapDoc('#' + aID);
               let href = areaEl.attr('href');
               if(href) {
                  let m = href.match(/'0205',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)'/);
                  if(m) testZones.push({name: zoneName, url: "UTK0205_?PERFORMANCE_ID=" + m[1] + "&GROUP_ID=" + m[3] + "&PERFORMANCE_PRICE_AREA_ID=" + m[2]});
               }
           }
        });

        // Let's test a specific zone that Puppeteer said had 56 unsold seats: B1內野120區
        // Also B1內野102區 (171 unsold)
        for(let tz of testZones) {
           if(tz.name === 'B1內野120區' || tz.name === 'B1內野102區') {
               let r4 = await fetchHtml(tz.url, 'GET', baseUrl + 'UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
               let m = r4.html.match(/seatStr\s*=\s*'([^']*)'/);
               if(m) {
                   let parts = m[1].split('.');
                   // remove the leading "X:Y:" stuff if any.
                   // The first split by : happens in JS, but let's just match comma structures: "x,y,status,name"
                   let counts = {};
                   parts.forEach(p => {
                       let pMat = p.match(/^([^\:]+\:\d+\:)?(\d+),(\d+),([^,]*),(.+)/);
                       if(pMat) {
                           let status = pMat[4];
                           counts[status] = (counts[status] || 0) + 1;
                       } else {
                           if(p) console.log("Failed to parse part:", p);
                       }
                   });
                   console.log(`Zone ${tz.name}: Total parts: ${parts.length}`);
                   console.log(counts);
               }
           }
        }
    } catch(e) { console.error(e); }
})();
