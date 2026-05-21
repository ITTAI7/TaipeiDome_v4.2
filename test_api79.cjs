const cheerio = require('cheerio');
fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/UTK0205.min.js').then(r=>r.text()).then(t=>{
    let idx = t.indexOf('GET_SEAT');
    console.log(t.substring(Math.max(0, idx - 500), idx + 500));
});
