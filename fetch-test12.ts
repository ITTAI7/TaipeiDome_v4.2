import fs from 'fs';
const html = fs.readFileSync('test-area2.html', 'utf8');

const xMaxMatch = html.match(/xMax\s*=\s*(\d+)/);
const yMaxMatch = html.match(/yMax\s*=\s*(\d+)/);
const seatStrMatch = html.match(/seatStr\s*=\s*'([^']*)'/);
const tagMatch = html.match(/tagStr\s*=\s*'([^']*)'/);
const lockMatch = html.match(/lockStr\s*=\s*'([^']*)'/);
const priceMatch = html.match(/priceStr\s*=\s*'([^']*)'/);
const rowPriceMatch = html.match(/rowPriceStr\s*=\s*'([^']*)'/);

console.log("xMax =", xMaxMatch?.[1]);
console.log("yMax =", yMaxMatch?.[1]);
if (seatStrMatch) console.log("seatStr len=", seatStrMatch[1].split('.').length);
if (tagMatch) console.log("tagStr len=", tagMatch[1].split('.').length);
if (lockMatch) console.log("lockStr len=", lockMatch[1].split('.').length);
if (priceMatch) console.log("priceStr =", priceMatch[1]);
if (rowPriceMatch) console.log("rowPriceStr len =", rowPriceMatch[1].split('.').length);

