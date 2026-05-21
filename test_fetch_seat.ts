import { BrothersScraper } from './src/services/scrapers/BrothersScraper.ts';
import fs from 'fs';
(async () => {
    let s = new BrothersScraper();
    let gs = await s.getGames();
    let original = s['fetchHtml'].bind(s);
    let captured = "";
    s['fetchHtml'] = async (u, r, a) => {
        let res = await original(u, r, a);
        if (u.includes('UTK0205_') && !captured) captured = res.html;
        return res;
    };
    try { await s.getTickets(gs[0].link); } catch(e){}
    fs.writeFileSync('r4_dump.txt', captured);
})();
