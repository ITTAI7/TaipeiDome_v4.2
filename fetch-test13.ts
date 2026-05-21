import fs from 'fs';
const html = fs.readFileSync('test-area2.html', 'utf8');

// print the first 2000 chars of the javascript inside test-area2.html that sets these variables
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
let m;
while ((m = scriptRegex.exec(html)) !== null) {
    if (m[1].includes('xMax')) {
        console.log(m[1].substring(0, 1000));
        break;
    }
}
