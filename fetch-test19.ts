import fs from 'fs';
const html = fs.readFileSync('UTK0204.html', 'utf8');

const t = html.split('<tr class="saleTr"');
for (let i = 1; i < Math.min(6, t.length); i++) {
   console.log(t[i].substring(0, 300));
}
