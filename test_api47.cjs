const fs=require('fs');
Promise.all([
    'https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/memlib.min.js',
    'https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/js/actions.min.js',
    'https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/UTK0205.min.js',
    'https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/master.min.js'
].map(u=>fetch(u).then(r=>r.text()))).then(ts=>{
    ts.forEach((t, i) => {
        if(t.includes('TBL')) console.log(`Found TBL in script ${i}`);
    });
});
