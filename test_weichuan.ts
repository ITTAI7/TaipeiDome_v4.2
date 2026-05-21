import * as cheerio from 'cheerio';

async function test() {
  const baseUrl = 'https://tix.wdragons.com/';
  const initRes = await fetch(new URL('UTK0102_', baseUrl));
  const html = await initRes.text();
  console.log("Found capt:", html.includes('Captcha'), html.includes('captcha'));
  // Find strings like "xxx/Captcha.ashx" or similar
  const matches = html.match(/[a-zA-Z0-9_\/]*[cC]aptcha[a-zA-Z0-9_\/\-\.]*/g);
  if (matches) {
    console.log(Array.from(new Set(matches)));
  }


}
test();
