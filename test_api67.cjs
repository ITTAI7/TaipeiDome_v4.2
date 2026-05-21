const fs=require('fs');
fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/master.min.js').then(r=>r.text()).then(t=>{
    const idx = t.indexOf('function Send');
    if(idx>=0) console.log(t.substring(idx-10, idx+200));
    else {
        const idx2 = t.indexOf('Send =');
        if(idx2>=0) console.log(t.substring(idx2-10, idx2+200));
        else console.log('not found in master.min.js');
    }
});
