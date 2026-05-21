import * as cheerio from 'cheerio';

async function test() {
  const baseUrl = 'https://tix.wdragons.com/';
  const initRes = await fetch(new URL('UTK0102_', baseUrl));
  
  let cookies: string[] = [];
  if (typeof initRes.headers.getSetCookie === 'function') {
    cookies = initRes.headers.getSetCookie();
  }
  const cookieStr = cookies.map(c => c.split(';')[0]).join('; ');

  const captRes = await fetch(new URL(`/Home/pic?TYPE=UTK1306&ts=${Date.now()}`, baseUrl).href, {
      headers: { 'Cookie': cookieStr, 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3' }
  });
  
  console.log("Status:", captRes.status);
  console.log("Content-Type:", captRes.headers.get('content-type'));
  
  if (captRes.status === 200) {
      const buf = await captRes.arrayBuffer();
      const base64 = Buffer.from(buf).toString('base64');
      console.log("Base64 prefix:", base64.substring(0, 50));
  } else {
      console.log("Text:", await captRes.text());
  }
}
test();
