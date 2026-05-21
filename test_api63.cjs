const fs=require('fs');
Promise.all([
    'https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/memlib.min.js',
    'https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/master.min.js',
    'https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/js/actions.min.js',
    'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js',
].map(u=>fetch(u).then(r=>r.text()))).then(ts=>{
    ts.forEach((t, i) => {
        const m = t.match(/Send\s*=\s*function|function\s*Send/);
        if(m) console.log(`Found Send in ${i}:`, t.substring(m.index, m.index+200));
    });
});
