import fs from 'fs';
const html = fs.readFileSync('test-area.html', 'utf8');

const xMaxMatch = html.match(/xMax\s*=\s*(\d+)/);
const yMaxMatch = html.match(/yMax\s*=\s*(\d+)/);
const seatStrMatch = html.match(/seatStr\s*=\s*'([^']*)'/);
const lockStrMatch = html.match(/lockStr\s*=\s*'([^']*)'/);
const tagStrMatch = html.match(/tagStr\s*=\s*'([^']*)'/);

console.log("xMax =", xMaxMatch?.[1]);
console.log("yMax =", yMaxMatch?.[1]);
if (seatStrMatch) console.log("seatStr len=", seatStrMatch[1].split('.').length);
if (lockStrMatch) console.log("lockStr=", lockStrMatch[1]);
if (tagStrMatch) console.log("tagStr=", tagStrMatch[1]);
