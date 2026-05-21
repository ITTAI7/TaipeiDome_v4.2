fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/UTK0204.min.js?v=00.00.00').then(r=>r.text()).then(t=>{
    const idx = t.indexOf('$("map area").click');
    console.log(t.substring(idx, idx+500));
});
