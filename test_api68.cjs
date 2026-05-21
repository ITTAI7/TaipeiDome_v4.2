const cheerio = require('cheerio');
const fs = require('fs');

(async()=>{
   const html = fs.readFileSync('utk0204.html', 'utf8');
   const $ = cheerio.load(html);
   let scripts = [];
   $('script').each((i, el)=>{
       const src = $(el).attr('src');
       if(src && src.startsWith('http')) scripts.push(src);
   });
   for(let url of scripts) {
      try {
          const t = await fetch(url).then(r=>r.text());
          const m = t.match(/Send\s*=/);
          const m2 = t.match(/function\s+Send/);
          if(m || m2) {
              console.log("FOUND in", url);
              const idx = (m || m2).index;
              console.log(t.substring(idx-10, idx+250));
          }
      } catch(e) {}
   }
})();
