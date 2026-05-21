import { ITicketScraper, GameLink, TicketInfo, TicketZone } from './ITicketScraper.js';

export class TsgScraper implements ITicketScraper {
  private baseApiUrl = 'https://ticket-platform.newretail.tw/api/v1/public';
  private headers = {
    'x-company-code': 'tsghawks',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
  };

  async getGames(): Promise<GameLink[]> {
    console.log('Fetching TSG Hawks games via JSON API...');
    
    // As per findings, the spotlight API returns all games with their availability status
    const spotlightUrl = `${this.baseApiUrl}/spotlight`;
    
    const res = await fetch(spotlightUrl, { headers: this.headers });
    if (!res.ok) {
      throw new Error(`Failed to fetch TSG games: ${res.status}`);
    }
    
    const data = await res.json();
    const gameLinks: GameLink[] = [];
    
    if (data.regulars) {
      data.regulars.forEach((g: any) => {
        // Filter out games that are "已結束" (disabled/購票時間已結束)
        if (g.eligibilityStatus !== 'disabled') {
          // Format date to local string or keep ISO substring
          const dateStr = g.gameTime ? g.gameTime.substring(0, 10).replace(/-/g, '/') : '未知日期';
          const title = `${dateStr} - ${g.away}vs${g.home} - ${g.venueName}`;
          
          // Encode activityId & eventSessionId into a custom link URI format or explicit JSON api address
          const queryParams = new URLSearchParams({
            activityId: g.activityId,
            eventSessionId: g.eventSessionId
          });
          const link = `https://ticket-platform.newretail.tw/tsg-api-params?${queryParams.toString()}`;

          gameLinks.push({
            title,
            link
          });
        }
      });
    }

    console.log(`Found ${gameLinks.length} active TSG Hawks games.`);
    return gameLinks;
  }

  async getTickets(gameUrlStr: string, onProgress?: (msg: string) => void): Promise<TicketInfo> {
    console.log(`Scraping tickets for TSG: ${gameUrlStr}`);
    if (onProgress) onProgress("讀取各區座位資訊...");
    
    // Parse the encoded parameters we passed in getGames
    const urlParams = new URLSearchParams(gameUrlStr.split('?')[1] || '');
    const activityId = urlParams.get('activityId');
    const eventSessionId = urlParams.get('eventSessionId');

    if (!activityId || !eventSessionId) {
      throw new Error('Invalid TSG game format: missing activityId or eventSessionId');
    }

    const availUrl = `${this.baseApiUrl}/seat-availability?activityId=${typeof activityId === 'string' ? activityId : ''}&eventSessionId=${typeof eventSessionId === 'string' ? eventSessionId : ''}`;
    
    const res = await fetch(availUrl, { headers: this.headers });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch TSG seat availability: ${res.status}`);
    }

    const data = await res.json();
    
    let total_unsold = 0;
    const details: TicketZone[] = [];

    if (Array.isArray(data)) {
        data.forEach((zone: any) => {
            const unsold = zone.availableSeats || 0;
            total_unsold += unsold;
            details.push({
                zone: zone.name || zone.code,
                unsold: unsold
            });
        });
    }

    console.log(`Found ${details.length} ticket zones. Total unsold: ${total_unsold}`);
    return { total_unsold, details };
  }
}
