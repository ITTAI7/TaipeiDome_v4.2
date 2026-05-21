import * as cheerio from 'cheerio';
async function test() {
  const url = 'https://ticket.tsghawks.com/activitys/activitys';
  const res = await fetch(url);
  const text = await res.text();
  console.log(text.substring(0, 500));
}
test();
