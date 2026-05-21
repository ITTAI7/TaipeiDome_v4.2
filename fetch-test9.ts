import fs from 'fs';
const html = fs.readFileSync('test-area.html', 'utf8');
const jsVars = html.match(/[a-zA-Z0-9_]+\s*=\s*['"][^'"]*['"]/g);
if (jsVars) {
    for (let c of jsVars) {
        if (c.length < 100) console.log(c);
    }
}
