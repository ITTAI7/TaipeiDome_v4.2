import fetch from 'node-fetch';

async function test() {
    const r = await fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS/Images/Temp/P18UQBUZ/1_P18UQBUZ_live.map?v=031366c4-00f0-457b-802d-0a151a9f9680');
    const text = await r.text();
    console.log(text.substring(0, 500));
}
test();
