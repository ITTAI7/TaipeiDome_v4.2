import * as cheerio from 'cheerio';
import * as fs from 'fs';

const html = fs.readFileSync('fubon_utk0101.html', 'utf-8');
const $ = cheerio.load(html);

$('a').each((i, el) => {
   console.log($(el).attr('href'), $(el).text().trim());
});
