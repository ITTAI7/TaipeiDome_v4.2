import * as cheerio from 'cheerio';

async function test() {
  const baseUrl = 'https://tix.ctbcsports.com/';
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
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': cookieStr,
      'RequestVerificationToken': reqVer,
      'Authorization': auth,
    },
    body: '' 
  });
  const evText = await evRes.text();
  const match = evText.match(/_cevent\s*=\s*(\[[\s\S]*\])/);
  if (match) {
    const events = JSON.parse(match[1]);
    console.log("First event:", events[0]);
  } else {
    console.log(evText);
  }
}
test();
