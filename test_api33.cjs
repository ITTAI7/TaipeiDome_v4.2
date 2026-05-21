const cheerio = require('cheerio');
const fs = require('fs');
const html = fs.readFileSync('utk0204.html', 'utf8');
const $ = cheerio.load(html);
$('script').each((i, el) => {
    const text = $(el).html();
    if(text && text.includes('function')) console.log(text.substring(0, 500));
});
