const fs=require('fs');
Promise.all([
    'https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/memlib.min.js',
    'https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/js/actions.min.js',
    'https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/master.min.js'
].map(u=>fetch(u).then(r=>r.text()))).then(ts=>{
    ts.forEach((t, i) => {
        const idx = t.indexOf('function Send(');
        if(idx>=0) console.log(`Found in ${i}:`, t.substring(idx, idx+300));
    });
});
