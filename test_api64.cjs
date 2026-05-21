const html = require('fs').readFileSync('utk0204.html', 'utf8');
const idx = html.indexOf('Send');
if(idx > 0) {
    console.log(html.substring(Math.max(0, idx-50), idx+100));
} else { console.log('Send not found at all'); }
