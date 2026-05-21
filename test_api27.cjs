const cheerio = require('cheerio');
fetch('https://tix.ctbcsports.com/BROTHERS/UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O').then(r=>r.text()).then(t=>{
    const $ = cheerio.load(t);
    let hrefs = [];
    $('tr.saleTr').each((i, el) => {
        if ($(el).text().includes('熱賣中')) {
            const onclick = $(el).attr('onclick');
            if (onclick) hrefs.push(onclick.split("'")[1]);
        }
    });
    console.log(hrefs[0]);
});
