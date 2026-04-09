import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-4071d3bf/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form submission endpoint
app.post("/make-server-4071d3bf/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, queries } = body;

    if (!name || !email || !queries) {
      return c.json({ success: false, error: "Missing required fields" }, 400);
    }

    // Store in KV store with timestamp
    const timestamp = new Date().toISOString();
    const key = `contact:${timestamp}:${email}`;
    await kv.set(key, { name, email, queries, timestamp });

    return c.json({ success: true, message: "Contact form submitted successfully" });
  } catch (error) {
    return c.json({ success: false, error: "Failed to process request" }, 500);
  }
});

Deno.serve(app.fetch);