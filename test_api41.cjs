const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('utk0205.html', 'utf8');
const $ = cheerio.load(html);
let s = '';
$('script').each((i, el)=>{ if($(el).html()?.includes('DoPost')) s+=$(el).html()+'\n'; });
fs.writeFileSync('test_api41.txt', s);
