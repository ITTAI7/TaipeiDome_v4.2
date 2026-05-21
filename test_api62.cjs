const html = require('fs').readFileSync('utk0204.html', 'utf8');
console.log(html.match(/<form[^>]*>/g));
