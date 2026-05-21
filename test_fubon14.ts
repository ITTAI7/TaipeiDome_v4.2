import * as cheerio from 'cheerio';

async function test() {
  const baseUrl = 'https://guardians.fami.life/';
  const initRes = await fetch(new URL('UTK0101_', baseUrl));
  
  let cookies: string[] = [];
  initRes.headers.forEach((v, k) => {
     if (k.toLowerCase() === 'set-cookie') cookies.push(v);
  });
  const cookieStr = cookies.map(c => c.split(';')[0]).join('; ');
  
  const html = await initRes.text();
  const $ = cheerio.load(html);
  
  const reqVer = $('input[name="__RequestVerificationToken"]').attr('value') || '';
  const auth = $('input[name="__JWtToken"]').attr('value') || '';

  console.log('ReqVer:', reqVer.substring(0,20)+'...');
  console.log('Auth:', auth.substring(0,20)+'...');

  const evRes = await fetch(new URL('UTK0101_/GET_CALENDAR_EVENTS', baseUrl), {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': cookieStr,
      'RequestVerificationToken': reqVer,
      'Authorization': auth,
      'Referer': baseUrl + 'UTK0101_',
      'Origin': 'https://guardians.fami.life'
    },
    body: '' 
  });

  const evText = await evRes.text();
  console.log(evText.substring(0, 500));
}

test();
