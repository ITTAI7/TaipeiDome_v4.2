import * as cheerio from 'cheerio';

async function test() {
  const baseUrl = 'https://guardians.fami.life/';
  const res2 = await fetch(new URL('UTK0201_', baseUrl));
  const text2 = await res2.text();
  console.log(text2.substring(0, 1000));
}

test();
