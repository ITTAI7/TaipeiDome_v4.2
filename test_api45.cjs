const cheerio = require('cheerio');
const html = require('fs').readFileSync('utk0205_v2.html', 'utf8');
const $ = cheerio.load(html);
$('script').each((i, el)=>{ if($(el).html()?.includes('p1109') || $(el).html()?.includes('map') || $(el).html()?.includes('ajax')) console.log($(el).html().substring(0,250)); });
