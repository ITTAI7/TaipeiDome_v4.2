import * as cheerio from 'cheerio';

async function test() {
  const baseUrl = 'https://guardians.fami.life/';
  
  // 1. Get HTML and Cookie
  const res1 = await fetch(new URL('UTK0101_', baseUrl));
  const cookies = [];
  res1.headers.forEach((v, k) => {
     if (k.toLowerCase() === 'set-cookie') cookies.push(v);
  });
  console.log('Cookies:', cookies);
  
  const cookieStr = cookies.map(c => c.split(';')[0]).join('; ');

  const html = await res1.text();
  const $ = cheerio.load(html);
  
  const reqVer = $('input[name="__RequestVerificationToken"]').attr('value') || '';
  
  // 2. Fetch API
  const resApi = await fetch(new URL('UTK0101_/GET_CALENDAR_EVENTS', baseUrl), {
      method: 'POST',
      headers: {
          'Cookie': cookieStr,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'X-Requested-With': 'XMLHttpRequest',
          'RequestVerificationToken': reqVer
      }
  });

  const apiText = await resApi.text();
  console.log('API Text length:', apiText.length);
  console.log(apiText.substring(0, 500));
}

test();
