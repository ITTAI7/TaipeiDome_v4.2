fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/UTK0205.min.js?v=00.00.00').then(r=>r.text()).then(t=>{
    const regex = /DoPost[^\)]*\)/g;
    console.log(t.match(regex));
});
