import fetch from 'node-fetch';
import fs from 'fs';

async function test() {
    // Let's try to fetch the base map instead of _live.map
    const r = await fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS/Images/Temp/P18UQBUZ/1_P18UQBUZ.map');
    const text = await r.text();
    console.log(text.substring(0, 1000));
}
test();
