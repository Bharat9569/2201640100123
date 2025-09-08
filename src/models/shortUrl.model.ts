export interface ShortUrl {
  shortcode: string;
  originalUrl: string;
  createdAt: Date;
  expiry: Date;
  clicks: {
    timestamp: Date;
    source?: string;
  }[];
}

export const shortUrls: Record<string, ShortUrl> = {};
