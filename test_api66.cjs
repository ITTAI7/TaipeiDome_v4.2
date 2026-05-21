fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/UTK0204.min.js?v=00.00.00').then(r=>r.text()).then(t=>{
    let pos = 0;
    while(t.indexOf('$("map area")', pos) !== -1) {
         let idx = t.indexOf('$("map area")', pos);
         console.log(t.substring(idx, idx+150));
         pos = idx + 5;
    }
});
