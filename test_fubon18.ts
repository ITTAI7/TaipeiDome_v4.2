import { FubonScraper } from './src/services/scrapers/FubonScraper.js';

async function test() {
  const scraper = new FubonScraper();
  try {
    const games = await scraper.getGames();
    if (games.length > 0) {
      console.log('Testing ticket scraping for:', games[0].link);
      const tickets = await scraper.getTickets(games[0].link);
      console.log('Tickets:', tickets);
    }
  } catch(e) {
    console.error(e);
  }
}
test();
