import { FubonScraper } from './src/services/scrapers/FubonScraper.js';

async function test() {
  const scraper = new FubonScraper();
  try {
    const games = await scraper.getGames();
    console.log('Games:', games);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
