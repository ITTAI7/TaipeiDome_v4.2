const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('utk0205.html', 'utf8');
const $ = cheerio.load(html);
$('script').each((i, el)=>{ if($(el).html()?.includes('GET_')) console.log($(el).html()); });
