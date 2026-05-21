fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/UTK0205.min.js?v=00.00.00').then(r=>r.text()).then(t=>{
    const idx = t.indexOf('TBL');
    console.log(t.substring(Math.max(0, idx-200), idx+200));
});
