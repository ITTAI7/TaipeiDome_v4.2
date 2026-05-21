const cheerio = require('cheerio');
const $ = cheerio.load(require('fs').readFileSync('utk0205_v3.html', 'utf8'));
$('script').each((i, el)=>{ console.log($(el).attr('src')); });
