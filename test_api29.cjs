const cheerio = require('cheerio');
fetch('https://tix.ctbcsports.com/BROTHERS/UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O').then(r=>r.text()).then(t=>{
    const $ = cheerio.load(t);
    $('script').each((i, el) => {
        const src = $(el).attr('src');
        if (src) console.log(src);
    });
});
