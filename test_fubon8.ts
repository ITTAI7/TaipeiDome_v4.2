import * as fs from 'fs';
const html = fs.readFileSync('fubon_utk0101.html', 'utf-8');
const scriptMatches = html.match(/<script(.*?)>(.*?)<\/script>/gs);
scriptMatches?.forEach((m, i) => {
   if (m.includes('_cevent')) {
       console.log(`Script ${i}: \n`, m.substring(0, 1000));
   }
});
