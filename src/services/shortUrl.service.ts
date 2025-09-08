import { ShortUrl, shortUrls } from "../models/shortUrl.model";

function generateShortcode(length = 6): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const createShortUrlService = (
  url: string,
  validity: number = 30,
  customShortcode?: string
): ShortUrl => {
  let shortcode = customShortcode || generateShortcode();

  // Ensure uniqueness
  if (shortUrls[shortcode]) {
    throw new Error("Shortcode already exists");
  }

  const now = new Date();
  const expiry = new Date(now.getTime() + validity * 60 * 1000);

  const newShortUrl: ShortUrl = {
    shortcode,
    originalUrl: url,
    createdAt: now,
    expiry,
    clicks: [],
  };

  shortUrls[shortcode] = newShortUrl;
  return newShortUrl;
};

export const getShortUrlStatsService = (shortcode: string): ShortUrl | null => {
  return shortUrls[shortcode] || null;
};
