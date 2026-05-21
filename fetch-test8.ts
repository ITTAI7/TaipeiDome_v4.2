import fs from 'fs';
const html = fs.readFileSync('test-area.html', 'utf8');
const match = html.match(/seatStr\s*=\s*'([^']*)'/);
if (match) {
    const seatStr = match[1];
    console.log("xMax =", html.match(/xMax = (\d+)/)?.[1]);
    console.log("yMax =", html.match(/yMax = (\d+)/)?.[1]);
    console.log("seatStr preview:", seatStr.substring(0, 500));
}
