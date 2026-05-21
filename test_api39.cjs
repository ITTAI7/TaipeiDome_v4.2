const fs = require('fs');
fetch('https://tix.ctbcsports.com/BROTHERS/UTK0205_?PERFORMANCE_ID=P18UQBUZ&PRODUCT_ID=P16ANF0O&PLACE_ROW_ID=a117').then(r=>r.text()).then(t=>{
    fs.writeFileSync('utk0205.html', t);
});
