import fs from 'fs';

async function test() {
    let allCookies = new Map<string, string>();
    let reqVer = '';
    let auth = '';

    const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
    const uProductId = 'P16ANF0O';
    const uStartDate = '2026/05/22';

    const fetchHtml = async (url: string, referer: string | null = null, asAjax: boolean = false) => {
       const cookieStr = Array.from(allCookies.entries()).map(([k,v])=>`${k}=${v}`).join('; ');
       let opts: any = { 
           headers: { 
               'Cookie': cookieStr, 
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
           }, redirect: 'manual' 
       };
       if(referer) opts.headers['Referer'] = referer;
       if(asAjax) {
           opts.headers['X-Requested-With'] = 'XMLHttpRequest';
           if (reqVer) opts.headers['RequestVerificationToken'] = reqVer;
           if (auth) opts.headers['Authorization'] = auth;
       }
       
       const res = await fetch(new URL(url, baseUrl).href, opts);
       let setCookies = res.headers.getSetCookie();
       if(setCookies){
           setCookies.forEach(c => {
               let pair = c.split(';')[0];
               let sepIdx = pair.indexOf('=');
               if (sepIdx !== -1) {
                   let k = pair.substring(0, sepIdx);
                   let v = pair.substring(sepIdx + 1);
                   allCookies.set(k, v);
               }
           });
       }
       const htmlText = await res.text();
       return {status: res.status, html: htmlText};
    };

    await fetchHtml('UTK0101_');
    const page1Html = await fetchHtml(`UTK0201_?PRODUCT_ID=${uProductId}&STARTDATE=${uStartDate}`, baseUrl + 'UTK0101_');
    
    // Quick regex for verification token
    const verMatch = page1Html.html.match(/name="__RequestVerificationToken" type="hidden" value="([^"]+)"/);
    if(verMatch) reqVer = verMatch[1];
    const authMatch = page1Html.html.match(/name="__JWtToken" type="hidden" value="([^"]+)"/);
    if(authMatch) auth = authMatch[1];

    const pListUrl = `PerformanceListControl?PRODUCT_ID=${uProductId}&STARTDATE=${encodeURIComponent(uStartDate)}&SEASON_TICKET_ID=&ItemMaxNumber=4`;
    const pListRes = await fetchHtml(pListUrl, baseUrl + `UTK0201_?PRODUCT_ID=${uProductId}&STARTDATE=${uStartDate}`, true);
    
    let mPerf = pListRes.html.match(/PERFORMANCE_ID=([A-Z0-9]+)/);
    const performanceId = mPerf![1];

    await fetchHtml(`UTK0204_?PERFORMANCE_ID=${performanceId}&PRODUCT_ID=${uProductId}`, baseUrl + `UTK0201_?PRODUCT_ID=${uProductId}&STARTDATE=${uStartDate}`);

    // Fetch an area. Let's hardcode one URL for B1內野102區: UTK0205_?PERFORMANCE_ID=P16ANK8Y&GROUP_ID=3251&PERFORMANCE_PRICE_AREA_ID=794511
    // Actually we don't know the keys. Let's just find one from the HTML
    const r3 = await fetchHtml(`UTK0204_?PERFORMANCE_ID=${performanceId}&PRODUCT_ID=${uProductId}`, baseUrl + `UTK0201_?PRODUCT_ID=${uProductId}&STARTDATE=${uStartDate}`);
    const mapMatch = r3.html.match(/UTK0205_\?PERFORMANCE_ID=[^&]+&GROUP_ID=[^&]+&PERFORMANCE_PRICE_AREA_ID=[^'"]+/);
    let areaUrl = mapMatch ? mapMatch[0] : `UTK0205_?PERFORMANCE_ID=${performanceId}&GROUP_ID=3251&PERFORMANCE_PRICE_AREA_ID=794511`;
    // wait map returns JS.
    let mapObjUrlMatch = r3.html.match(/imgs2\.utiki\.com\.tw.*?_live\.map/);
    if (mapObjUrlMatch) {
       const rMap = await fetchHtml('https://' + mapObjUrlMatch[0]);
       let m = rMap.html.match(/'0205',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)'/);
       if (m) {
           areaUrl = `UTK0205_?PERFORMANCE_ID=${m[1]}&GROUP_ID=${m[3]}&PERFORMANCE_PRICE_AREA_ID=${m[2]}`;
       }
    }

    const r4 = await fetchHtml(areaUrl, baseUrl + `UTK0204_?PERFORMANCE_ID=${performanceId}&PRODUCT_ID=${uProductId}`);
    fs.writeFileSync('test-area.html', r4.html);
    console.log("Wrote test-area.html");
}
test();
