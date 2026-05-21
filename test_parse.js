const cheerio = require('cheerio');
const seatStr = '右:1:0,0,,B1內野116區輪椅席-38排-6號.0,5,,B1內野116區輪椅席-38排-3號.0,7,,B1內野116區輪椅席-38排-2號';
const matrix = seatStr;
let unsold = 0;
let sold = 0;
const groups = matrix.split('\t');
for (const group of groups) {
    const parts = group.split(':');
    if (parts.length >= 3) {
        const status = parts[1];
        if (parts[2].trim().length > 0) {
            const count = parts[2].split('.').length;
            if (status === '0') unsold += count;
            else if (status === '1' || status === '3' || status === '4') sold += count;
            else sold += count; // Wait, maybe '1' means sold, are there others?
        }
    }
}
console.log("u:", unsold, "s:", sold);
