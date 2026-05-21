import * as fs from 'fs';
const html = fs.readFileSync('fubon_utk0101.html', 'utf-8');
console.log(html.substring(0, 1000));
