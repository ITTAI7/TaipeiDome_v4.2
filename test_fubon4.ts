import * as fs from 'fs';
const html = fs.readFileSync('fubon_utk0101.html', 'utf-8');
const detailIndices = [];
let i = -1;
while ((i = html.indexOf('detail', i + 1)) >= 0) {
  detailIndices.push(i);
}
console.log(`Found ${detailIndices.length} occurrences of "detail"`);
if (detailIndices.length > 0) {
  const index = detailIndices[0];
  console.log(html.substring(Math.max(0, index - 200), Math.min(html.length, index + 200)));
}
