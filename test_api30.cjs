const cheerio = require('cheerio');
const fs = require('fs');
fetch('https://tix.ctbcsports.com/BROTHERS/UTK0204_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O').then(r=>r.text()).then(t=>{
    fs.writeFileSync('utk0204.html', t);
});
