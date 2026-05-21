import * as cheerio from 'cheerio';
import { Agent, fetch, setGlobalDispatcher } from 'undici';

// Set up undici global Agent for keep-alive and ignoring cert errors if needed
setGlobalDispatcher(new Agent({
  connect: {
    rejectUnauthorized: false
  },
  pipelining: 1,
  keepAliveTimeout: 10000,
  keepAliveMaxTimeout: 10000
}));

let cookieStr = '';
const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';

async function fetchHtml(urlStr, referer = null) {
        const u = urlStr.startsWith('http') ? urlStr : baseUrl + urlStr;
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache'
        };
        if (cookieStr) headers['Cookie'] = cookieStr;
        if (referer) headers['Referer'] = referer;
        const resp = await fetch(u, { headers });
        const setCookieList = resp.headers.getSetCookie();
        if (setCookieList && setCookieList.length > 0) {
            const mapped = setCookieList.map(c => c.split(';')[0]);
            let cookies = cookieStr ? cookieStr.split(';') : [];
            cookies = cookies.map(c => c.trim());
            for (let c of mapped) {
                let name = c.split('=')[0];
                cookies = cookies.filter(cx => !cx.startsWith(name + '='));
                cookies.push(c);
            }
            cookieStr = cookies.join('; ');
        }
        return { html: await resp.text(), finalUrl: resp.url };
}

async function test() {
  const link = 'https://tix.ctbcsports.com/BROTHERS/UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22';
  
  await fetchHtml('UTK0101_');
  const r1 = await fetchHtml(link);
  let html = r1.html;
  console.log('r1 finalUrl', r1.finalUrl);
            const pId = 'P192UW2D';
            
            const h2 = await fetchHtml(`UTK0201_?PERFORMANCE_ID=${pId}`);
            const r3 = await fetchHtml(`UTK0204_?PERFORMANCE_ID=${pId}&PRODUCT_ID=P16ANF0O`);
            
            let mapObjUrlMatch = r3.html.match(/imgs2\.utiki\.com\.tw.*?_live\.map/);
            console.log('Map URL:', mapObjUrlMatch ? mapObjUrlMatch[0] : null);
            let mapDoc = null;
            if (mapObjUrlMatch) {
                const rMap = await fetchHtml('https://' + mapObjUrlMatch[0]);
                mapDoc = cheerio.load(rMap.html);
                
                const el = mapDoc('area[title*="108區輪椅席"]');
                console.log('Found area by title:', el.length);
                if (el.length > 0) {
                    console.log('Area HTML:', mapDoc.html(el.first()));
                }
                
                const el2 = mapDoc('area[title*="輪椅陪伴席"]');
                console.log('Wheelchair comp found:', el2.length);
            }
}
test();
