const cheerio = require('cheerio');
fetch('https://tix.ctbcsports.com/BROTHERS/UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O').then(r=>r.text()).then(t=>{
    const $ = cheerio.load(t);
    $('tr.saleTr').each((i, el) => {
        if ($(el).text().includes('熱賣中') && i === 20) {
            console.log($(el).prop('outerHTML') || $(el).html()); // Just output html
        }
    });
});
