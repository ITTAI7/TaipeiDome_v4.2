const cheerio = require('cheerio');

(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        let allCookies = new Map();
        
        const fetchHtml = async (url, method='GET', body=null) => {
             const cookieStr = Array.from(allCookies.entries()).map(([k,v])=>`${k}=${v}`).join('; ');
             let opts = { headers: { Cookie: cookieStr, 'User-Agent': 'Mozilla/5.0' } };
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
             return {html: await res.text(), url: res.url};
        };

        // 1. UTK0101_
        await fetchHtml('UTK0101_');
        // 2. UTK0201_
        await fetchHtml('UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22');
        // 3. UTK0204_
        await fetchHtml('UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O');
        
        // 4. UTK0205_
        let res4 = await fetchHtml("UTK0205_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O&PLACE_ROW_ID=a117");
        console.log("IndexOf TBL:", res4.html.indexOf('TBL'), "Final URL:", res4.url);
        
        if (res4.html.indexOf('請先登入') >= 0) {
            console.log("Requires Login!!");
        }
    } catch(e) { console.error(e); }
})();
