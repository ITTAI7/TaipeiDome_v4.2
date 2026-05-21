import * as cheerio from 'cheerio';

async function test() {
  const baseUrl = 'https://tix.wdragons.com/';
  const initRes = await fetch(new URL('UTK0101_', baseUrl));
  
  let cookies: string[] = [];
  if (typeof initRes.headers.getSetCookie === 'function') {
    cookies = initRes.headers.getSetCookie();
  }
  const cookieStr = cookies.map(c => c.split(';')[0]).join('; ');
  
  const html = await initRes.text();
  const $ = cheerio.load(html);
  
  const reqVer = $('input[name="__RequestVerificationToken"]').attr('value') || '';
  const auth = $('input[name="__JWtToken"]').attr('value') || '';

  const evRes = await fetch(new URL('UTK0101_/GET_CALENDAR_EVENTS', baseUrl), {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': cookieStr,
      'RequestVerificationToken': reqVer,
      'Authorization': auth,
      'Referer': baseUrl + 'UTK0101_',
      'Origin': 'https://tix.wdragons.com'
    },
    body: '' 
  });
  const evText = await evRes.text();
  const match = evText.match(/_cevent\s*=\s*(.*)?;?/);
  if (match) {
    const events = JSON.parse(match[1]);
    const places = [...new Set(events.map((e: any) => e.PLACE_ID))];
    console.log("Unique PLACE_IDs:", places);
    for (const placeId of places) {
       console.log("Testing place:", placeId);
       const tEvent = events.find((e: any) => e.PLACE_ID === placeId);
       const res2 = await fetch(new URL(`UTK0201_?PRODUCT_ID=${tEvent.PRODUCT_ID}&STARTDATE=${tEvent.S_SHOW_START_DATETIME.substring(0,10)}`, baseUrl).href, {
         headers: {
           'Cookie': cookieStr,
           'User-Agent': 'Mozilla/5.0'
         }
       });
       const html2 = await res2.text();
       const doc = cheerio.load(html2);
       console.log("Place og:title:", placeId, doc('meta[property="og:title"]').attr('content'));
    }
  }
}
test();
