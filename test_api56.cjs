fetch('https://imgs2.utiki.com.tw/Data/CTBC_SPORTS/Images/Temp/P18UQBUZ/1_P18UQBUZ_live.map').then(r=>r.text()).then(t=>console.log(t.substring(0, 500)));
