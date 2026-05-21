(async () => {
    try {
        const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
        const res = await fetch(baseUrl + 'UTK0201_?PRODUCT_ID=P16ANF0O&STARTDATE=2026/05/22');
        const html = await res.text();
        const matches = html.match(/PERFORMANCE_ID=([A-Z0-9]+)/g);
        console.log(matches ? [...new Set(matches)] : 'No PERFORMANCE_ID found');
        const ids = html.match(/P18[A-Z0-9]{5}/g);
        console.log("P18s:", ids ? [...new Set(ids)] : 'None');
    } catch(e) { console.error(e); }
})();
