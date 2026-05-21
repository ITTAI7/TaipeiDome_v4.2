import * as cheerio from 'cheerio';
import fs from 'fs';

async function test() {
  const res = await fetch('https://ticket.tsghawks.com/');
  const html = await res.text();
  fs.writeFileSync('tsg.html', html);
  console.log('Saved to tsg.html. Length:', html.length);
}

test().catch(console.error);
