const cheerio = require('cheerio');
const html = require('fs').readFileSync('utk0205_v2.html', 'utf8');
const $ = cheerio.load(html);
console.log($('body').text().replace(/\s+/g, ' ').substring(0, 500));
