import * as fs from 'fs';
const html = fs.readFileSync('fubon_utk0101.html', 'utf-8');
const tokenMatches = html.match(/name="__RequestVerificationToken" type="hidden" value="(.*?)"/);
console.log('Verification Token:', tokenMatches ? tokenMatches[1] : 'not found');

const jwtMatches = html.match(/name="__JWtToken" type="hidden" value="(.*?)"/);
console.log('JWT Token:', jwtMatches ? jwtMatches[1] : 'not found');
