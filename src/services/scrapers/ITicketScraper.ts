import * as cheerio from 'cheerio';

export interface GameLink {
  title: string;
  link: string;
}

export interface TicketZone {
  zone: string;
  unsold: number;
  sold?: number;
  total?: number;
  error?: string;
}

export interface TicketInfo {
  total_unsold: number;
  total_sold?: number;
  total_capacity?: number;
  details: TicketZone[];
}

export interface ITicketScraper {
  getGames(): Promise<GameLink[]>;
  getTickets(url: string, onProgress?: (msg: string) => void): Promise<TicketInfo>;
}
