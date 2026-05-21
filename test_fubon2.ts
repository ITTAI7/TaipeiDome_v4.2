import { FubonScraper } from './src/services/scrapers/FubonScraper.js';
import * as cheerio from 'cheerio';

async function test() {
  const baseUrl = 'https://guardians.fami.life/';
  const res = await fetch(new URL('UTK0101_', baseUrl));
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const detailTexts: string[] = [];
  $('#calendar td').each((_, td) => {
    detailTexts.push($(td).html() || '');
  });
  console.log('Total TDs:', detailTexts.length);
  if (detailTexts.length > 0) {
     console.log('First few TDs:', detailTexts.slice(0, 5));
     
     const detailsWithText = detailTexts.filter(t => t.includes('detail'));
     console.log('Details with detail class:', detailsWithText.length);
     if (detailsWithText.length > 0) {
        console.log(detailsWithText[0]);
     }
  } else {
     console.log('No calendar td found?');
     console.log('HTML snippet:', html.substring(0, 500));
  }
}

test();
