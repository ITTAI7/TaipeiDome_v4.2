fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/UTK0205.min.js?v=00.00.00').then(r=>r.text()).then(t=>{
    let occurrences = t.split('DoPost');
    console.log(occurrences[1].substring(0, 100));
    console.log(occurrences[2].substring(0, 100));
});
