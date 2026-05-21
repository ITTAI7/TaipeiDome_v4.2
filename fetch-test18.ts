import fetch from 'node-fetch';
import fs from 'fs';

async function test() {
    let allCookies = new Map<string, string>();
    let reqVer = '';
    let auth = '';

    const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
    const uProductId = 'P16ANF0O';
    const uStartDate = '2026/05/22';

    const fetchHtml = async (url: string, asAjax: boolean = false) => {
       let opts: any = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }, redirect: 'manual' };
       const res = await fetch(new URL(url, baseUrl).href, opts);
       return await res.text();
    };

    const page1Html = await fetchHtml(`UTK0201_?PRODUCT_ID=${uProductId}&STARTDATE=${uStartDate}`);
    
    // We already know performanceId = P18UQBUZ
    const performanceId = 'P18UQBUZ';

    const r3 = await fetchHtml(`UTK0204_?PERFORMANCE_ID=${performanceId}&PRODUCT_ID=${uProductId}`);
    fs.writeFileSync('UTK0204.html', r3);
    console.log("Wrote UTK0204.html");
}
test();
