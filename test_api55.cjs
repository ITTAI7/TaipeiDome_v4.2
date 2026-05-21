const cheerio = require('cheerio');
fetch('https://tix.ctbcsports.com/BROTHERS/UTK0205_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O&PLACE_ROW_ID=a117').then(r=>r.text()).then(t=>{
    const cheerio=require('cheerio');
    const $ = cheerio.load(t);
    console.log($('body').text().replace(/\s+/g, ' ').substring(0, 500));
    console.log(t.includes('TBL'));
});
