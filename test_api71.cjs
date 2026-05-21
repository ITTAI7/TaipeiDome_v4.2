fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/UTK0204.min.js').then(r=>r.text()).then(t=>{
    const i = t.indexOf('Send');
    console.log(i, t.substring(Math.max(0, i-50), i+50));
});
