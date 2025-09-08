import axios from "axios";

const LOG_API = "http://20.244.56.144/eva1uation-service/logs";
const AUTH_TOKEN = process.env.ACCESS_TOKEN; 

 async function Log(
  stack: "backend" | "frontend",
  level: "debug" | "info" | "warn" | "error" | "fatal",
  packageName: string,
  message: string,
  meta?: Record<string, any>
) {
  try {
    await axios.post(
      LOG_API,
      { stack, level, package: packageName, message, meta },
      { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } }
    );
  } catch (err) {
    console.error("Failed to send log", (err as any).message);
  }
}

export {Log}
