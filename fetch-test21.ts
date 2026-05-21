import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('UTK0204.html', 'utf8');
const $ = cheerio.load(html);

$('tr').each((i, el) => {
    if ($(el).find('#COLOR_LABEL').length > 0) {
        console.log($(el).text().replace(/\s+/g, ' ').trim());
    }
});
