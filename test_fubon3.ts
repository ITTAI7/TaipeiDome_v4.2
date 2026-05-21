import * as fs from 'fs';

async function test() {
  const baseUrl = 'https://guardians.fami.life/';
  const res = await fetch(new URL('UTK0101_', baseUrl));
  const html = await res.text();
  fs.writeFileSync('fubon_utk0101.html', html);
  console.log('Saved to fubon_utk0101.html');
}

test();
