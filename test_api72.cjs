fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/UTK0204.min.js').then(r=>r.text()).then(t=>{
    const i = t.indexOf('function Send');
    console.log(t.substring(i, i+700));
});
