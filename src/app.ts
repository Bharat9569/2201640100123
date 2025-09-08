import express from "express";
import shortUrlRoutes from "./routes/shortUrl.routes";

const app = express();
app.use(express.json());

app.use("/shorturls", shortUrlRoutes);

export default app;
