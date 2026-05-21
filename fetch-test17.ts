import fs from 'fs';
const html = fs.readFileSync('test-area2.html', 'utf8');
const allVarsMatch = html.match(/[a-zA-Z0-9_]+\s*=\s*['"][^'"]*['"]/g);
if (allVarsMatch) {
    for (let c of allVarsMatch) {
        if (c.includes('Str') || c.includes('Max')) {
           console.log(c.substring(0, 50));
        }
    }
}
