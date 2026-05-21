const fs = require('fs');
const html = fs.readFileSync('utk0205_v2.html', 'utf8');
console.log("IndexOf TBL:", html.indexOf('TBL'));
