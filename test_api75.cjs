const HTML = require('fs').readFileSync('utk0205_v2.html', 'utf8');
console.log(HTML.match(/TBL/i));
