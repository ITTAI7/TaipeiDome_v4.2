const cheerio = require('cheerio');
fetch('https://tix.ctbcsports.com/BROTHERS/UTK0205_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O&PLACE_ROW_ID=a117').then(r=>r.text()).then(t=>{
    const cheerio=require('cheerio');
    const $ = cheerio.load(t);
    $('script').each((i, el)=>{ if($(el).html()?.includes('load')) console.log($(el).html().substring(0,200)); });
});
