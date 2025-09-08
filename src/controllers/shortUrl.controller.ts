import { Request, Response } from "express";
import { createShortUrlService, getShortUrlStatsService } from "../services/shortUrl.service";
import { Log } from "../utils/logging";

const HOSTNAME = process.env.HOSTNAME || "http://localhost";
const PORT = process.env.PORT || 3000;

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { url, validity, shortcode } = req.body;

    if (!url) {
      await Log("backend", "error", "shorturl.controller", "URL is missing in request");
      return res.status(400).json({ error: "URL is required" });
    }

    const shortUrl = createShortUrlService(url, validity, shortcode);

    await Log("backend", "info", "shorturl.controller", "Short URL created successfully", {
      shortcode: shortUrl.shortcode,
      originalUrl: shortUrl.originalUrl,
    });

    return res.status(201).json({
      shortLink: `${HOSTNAME}:${PORT}/${shortUrl.shortcode}`,
      expiry: shortUrl.expiry.toISOString(),
    });
  } catch (err: any) {
    await Log("backend", "error", "shorturl.controller", "Failed to create short URL", {
      error: err.message,
    });
    return res.status(400).json({ error: err.message });
  }
};

export const getShortUrlStats = async (req: Request, res: Response) => {
  try {
    const { shortcode } = req.params;

    const shortUrl = getShortUrlStatsService(shortcode);

    if (!shortUrl) {
      await Log("backend", "warn", "shorturl.controller", "Shortcode not found", { shortcode });
      return res.status(404).json({ error: "Shortcode not found" });
    }

    
    if (shortUrl.expiry < new Date()) {
      await Log("backend", "warn", "shorturl.controller", "Shortcode expired", { shortcode });
      return res.status(410).json({ error: "Shortcode expired" });
    }

    await Log("backend", "info", "shorturl.controller", "Short URL stats retrieved", { shortcode });

    return res.status(200).json({
      originalUrl: shortUrl.originalUrl,
      createdAt: shortUrl.createdAt,
      expiry: shortUrl.expiry,
      totalClicks: shortUrl.clicks.length,
      clicks: shortUrl.clicks,
    });
  } catch (err: any) {
    await Log("backend", "error", "shorturl.controller", "Failed to fetch stats", {
      error: err.message,
    });
    return res.status(500).json({ error: "Internal server error" });
  }
};
