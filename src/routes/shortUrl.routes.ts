import { Router } from "express";
import { createShortUrl, getShortUrlStats } from "../controllers/shortUrl.controller";

const router = Router();

router.post("/", createShortUrl);        // POST /shorturls
router.get("/:shortcode", getShortUrlStats);  // GET /shorturls/:shortcode

export default router;
