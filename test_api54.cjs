const fs = require('fs');
const html = fs.readFileSync('utk0205_v2.html', 'utf8');
console.log(html.includes('TBL'));
console.log(html.includes('seat-empty'));
console.log(html.indexOf('seat-empty'));
