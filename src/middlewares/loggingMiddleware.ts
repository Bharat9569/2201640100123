import { Request, Response, NextFunction } from "express";
import { Log } from "../utils/logging.js";

export const loggingMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", async () => {
    const duration = Date.now() - start;

    await Log(
      "backend",
      "info",
      "request-logger",
      `Request: ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};
