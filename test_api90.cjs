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
           let status = r3Doc(el).find('span#SEAT').text().trim();
           if(status === '熱賣中') {
               let rel = r3Doc(el).attr('rel');
               if(rel) {
                   let aID = rel.replace('s', 'a');
                   let areaEl = mapDoc('#' + aID);
                   let href = areaEl.attr('href');
                   if(href) {
                      let m = href.match(/'0205',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)'/);
                      if(m) testZones.push("UTK0205_?PERFORMANCE_ID=" + m[1] + "&GROUP_ID=" + m[3] + "&PERFORMANCE_PRICE_AREA_ID=" + m[2]);
                   }
               }
           }
        });

        console.log(`Found ${testZones.length} 熱賣中 zones. Testing first 3...`);

        for(let i=0; i<Math.min(3, testZones.length); i++) {
           let targetZoneUrl = testZones[i];
           let r4 = await fetchHtml(targetZoneUrl, 'GET', baseUrl + 'UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
           let m = r4.html.match(/seatStr\s*=\s*'([^']*)'/);
           if(m) {
               let parts = m[1].split('.');
               // Let's filter parts correctly (there is a left string prefix sometimes "左:1:")
               // actually, some seatStr start with Left/Right or Floor info: "左:1:x,y..."
               // they are joined by '.'
               let countCommaComma = parts.filter(p => !!p && typeof p === 'string' && p.includes(',,')).length;
               console.log(`Zone ${i}: Total parts: ${parts.length}, contains ',,': ${countCommaComma}`);
               // Let's check a few items
               console.log("Samples:", parts.slice(0, 3));
           } else {
               console.log(`Zone ${i}: seatStr not found!!`);
           }
        }
    } catch(e) { console.error(e); }
})();
