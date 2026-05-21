import fs from 'fs';
const html = fs.readFileSync('UTK0204.html', 'utf8');

import * as cheerio from 'cheerio';
const $ = cheerio.load(html);

$('tr').each((i, el) => {
    if (i < 5) console.log($(el).html()?.replace(/\n/g, '').substring(0, 200));
});
