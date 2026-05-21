const fs = require('fs');
const html = fs.readFileSync('utk0204.html', 'utf8');
console.log(html.includes('請先登入'));
