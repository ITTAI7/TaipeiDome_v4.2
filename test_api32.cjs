const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('utk0204.html', 'utf8');
const $ = cheerio.load(html);
console.log($('area').length);
console.log($('area').first().prop('outerHTML'));
