import * as cheerio from 'cheerio';

async function test() {
  const baseUrl = 'https://guardians.fami.life/';
  const res1 = await fetch(new URL('UTK0101_', baseUrl));
  
  const cookies = [];
  res1.headers.forEach((v, k) => {
     if (k.toLowerCase() === 'set-cookie') cookies.push(v);
  });
  const cookieStr = cookies.map(c => c.split(';')[0]).join('; ');
  
  const html = await res1.text();
  const $ = cheerio.load(html);
  const reqVer = $('input[name="__RequestVerificationToken"]').attr('value') || '';

  const res2 = await fetch(new URL('UTK0201_', baseUrl), {headers: {'Cookie': cookieStr}});
  const text2 = await res2.text();
  const $2 = cheerio.load(text2);
  const reqVer2 = $2('input[name="__RequestVerificationToken"]').attr('value') || '';

  const resApi = await fetch(new URL('UTK0201_/PerformanceListControl?ItemMaxNumber=40', baseUrl), {
      method: 'POST',
      headers: {
          'Cookie': cookieStr,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
          'X-Requested-With': 'XMLHttpRequest',
          'RequestVerificationToken': reqVer2
      }
  });

  const apiText = await resApi.text();
  console.log('Result:', apiText);
}

test();
