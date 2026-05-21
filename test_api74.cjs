fetch('https://tix.ctbcsports.com/BROTHERS/UTK0205_?PERFORMANCE_ID=P18UQBUZ&GROUP_ID=117&PERFORMANCE_PRICE_AREA_ID=P191N48J').then(r=>r.text()).then(t=>{
    console.log(t.substring(1000, 2000).replace(/\s+/g, ' '));
});
