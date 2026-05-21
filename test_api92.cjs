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
           let status = r3Doc(el).find('span#SEAT').text().trim();
           if(status === '熱賣中') {
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
           }
        });

        console.log(`Processing ${testZones.length} 熱賣中 zones...`);
        let total = 0;
        for(let tz of testZones) {
           let r4 = await fetchHtml(tz.url, 'GET', baseUrl + 'UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
           let m = r4.html.match(/seatStr\s*=\s*'([^']*)'/);
           if(m) {
               let seatStr = m[1];
               let blocks = seatStr.split('\\t'); // actually it's \t in HTML ? Wait, let me check regex
               // Wait! if it is literally \t in the HTML source, it might be \\t or \t. Let's just split by \t or \\t
               let groups = seatStr.split(/\s+/);
               
               // Let's do exactly what JS does:
               // var l=seatStr.split("\t");
               // In JS, seatStr might have actual \t or literal \t.
               let l = seatStr.split(/\\t|\t/);
               
               let emptyInZone = 0;
               for(let g of l) {
                   let a = g.split(':');
                   if (a.length >= 3) {
                       let c = parseInt(a[1]);
                       if (c === 0) {
                           let r = a[2].split('.');
                           emptyInZone += r.length;
                       }
                   }
               }
               console.log(`Zone ${tz.name}: ${emptyInZone} empty seats`);
               total += emptyInZone;
           }
        }
        console.log("Total from 熱賣中:", total);
    } catch(e) { console.error(e); }
})();
