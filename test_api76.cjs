fetch('https://tix.ctbcsports.com/BROTHERS/UTK0205_?PERFORMANCE_ID=P18UQBUZ&GROUP_ID=117&PERFORMANCE_PRICE_AREA_ID=P191N48J').then(r=>r.text()).then(t=>{
    require('fs').writeFileSync('utk0205_v3.html', t);
    console.log("length:", t.length);
    console.log("match TBL:", t.match(/tbl/i));
});
