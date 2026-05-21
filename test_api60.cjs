const fs = require('fs');
const html = fs.readFileSync('utk0204.html', 'utf8');
const idx = html.indexOf('function Send');
console.log(idx >= 0 ? html.substring(idx, idx+500) : "Not found in utk0204");
