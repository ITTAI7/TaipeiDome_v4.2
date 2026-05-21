const cheerio = require('cheerio');
(async () => {
    const baseUrl = 'https://tix.ctbcsports.com/BROTHERS/';
    const initRes = await fetch(baseUrl + 'UTK0101_');
    const cookieStr = initRes.headers.getSetCookie().map(c=>c.split(';')[0]).join('; ');
    const html = await initRes.text();
    const $ = cheerio.load(html);
    const reqVer = $('input[name="__RequestVerificationToken"]').attr('value') || '';
    const auth = $('input[name="__JWtToken"]').attr('value') || '';
    const evRes = await fetch(baseUrl + 'UTK0101_/GET_CALENDAR_EVENTS', {
        method: 'POST',
        headers: { 'Cookie': cookieStr, 'RequestVerificationToken': reqVer, 'Authorization': auth }
    });
    const evText = await evRes.text();
    const match = evText.match(/_cevent\s*=\s*(\[[\s\S]*\])/);
    if(match) {
        const events = JSON.parse(match[1]);
        console.log(events.slice(0,2));
    }
})();
