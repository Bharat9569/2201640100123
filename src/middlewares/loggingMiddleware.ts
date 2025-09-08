import { Request, Response, NextFunction } from "express";
import { log } from "../utils/logClient.js";

export const loggingMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - start;

    await log(
      "backend",
      "info",
      "request-logger",
      `Request: ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};
