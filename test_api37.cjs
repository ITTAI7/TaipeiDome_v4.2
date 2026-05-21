const cheerio = require('cheerio');
fetch('https://tix.ctbcsports.com/BROTHERS/UTK0205_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O&PLACE_ROW_ID=a117').then(r=>r.text()).then(t=>{
    const cheerio=require('cheerio');
    const $ = cheerio.load(t);
    const tbl = $('.SeatTable');
    console.log("SeatTable Length:", tbl.length);
    console.log("SeatTable:", tbl.html());
    
    // any element with empty seats?
    console.log("seat-empty elements:", $('td[style*="seat-empty"]').length);
});
