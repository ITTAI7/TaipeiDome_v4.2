import * as fs from 'fs';
const html = fs.readFileSync('fubon_utk0101.html', 'utf-8');
const i1 = html.indexOf('SetCalendar');
console.log(html.substring(Math.max(0, i1 - 300), i1 + 500));
