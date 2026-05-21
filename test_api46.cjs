fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS_RWD/script/UTK0204.min.js?v=00.00.00').then(r=>r.text()).then(t=>console.log(t.substring(1000, 2500)));
