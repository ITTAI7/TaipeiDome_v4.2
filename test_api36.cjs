const cheerio = require('cheerio');
fetch('https://tix.ctbcsports.com/BROTHERS/UTK0205_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O&PLACE_ROW_ID=a117').then(r=>r.text()).then(t=>{
    const cheerio=require('cheerio');
    const $ = cheerio.load(t);
    const tbl = $('#TBL');
    console.log("TBL Length:", tbl.length);
    console.log("Empty seats inside table:", $('#TBL td[style*="seat-empty"]').length);
    const content = $('#TBL').html();
    if(content) console.log(content.substring(0, 300));
});
