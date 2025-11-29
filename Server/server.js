import express from "express";
import fetch from "node-fetch";
import crypto from "crypto";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.get("/test-upstream", async (req, res) => {
  try {
    console.log("Testing upstream...");
    
    const upstream = await fetch("https://oouth.campusdash.com.ng/API/endpoint.php", {
      method: "GET"
    });

    const text = await upstream.text();

    res.json({
      ok: true,
      status: upstream.status,
      body: text
    });
  } catch (err) {
    res.json({
      ok: false,
      error: err.message
    });
  }
});

//main code
app.use(cors({
  origin: (origin, callback) => {
    // this allows requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    // Allow ANY localhost port during development
    if (/^http:\/\/localhost:\d+$/i.test(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },

  methods: ["GET", "POST", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "X-Api-Key",
    "X-Signature",
    "X-Timestamp",
    "X-Nonce",
    "ACT",
  ],
}));

app.use(express.json());

// hmac config
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const UPSTREAM_API_URL = process.env.UPSTREAM_API_URL;
const ACTION = process.env.ACTION ;

function timestamp() {
  return Math.floor(Date.now() / 1000).toString();
}

function nonce() {
  return crypto.randomBytes(16).toString("hex");
}

function signMessage(message) {
  return crypto.createHmac("sha256", API_SECRET)
    .update(message)
    .digest("hex");
}

// post route
app.post("/api/waitlist", async (req, res) => {
  try {
    const body = JSON.stringify(req.body);
    const ts = timestamp();
    const n = nonce();

    const message = `${API_KEY}|${ACTION}|${ts}|${body}`;
    const signature = signMessage(message);

    console.log("Request body:", body);
    console.log("Headers sent to upstream:", {
      "X-Api-Key": API_KEY,
      "X-Signature": signature,
      "X-Timestamp": ts,
      "X-Nonce": n,
      ACT: ACTION,
    });

    const upstreamRes = await fetch(UPSTREAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY,
        "X-Signature": signature,
        "X-Timestamp": ts,
        "X-Nonce": n,
        ACT: ACTION,
      },
      body,
    });

    let data;
    try {
      data = await upstreamRes.json();
    } catch (jsonErr) {
      console.error("Failed to parse upstream JSON:", jsonErr);
      data = await upstreamRes.text(); // fallback to text
    }

    console.log("Upstream response status:", upstreamRes.status);
    console.log("Upstream response body:", data);

    if (!upstreamRes.ok) {
      console.error("Upstream returned an error!");
      return res.status(500).json({ error: "Upstream error", details: data });
    }

    return res.json({ success: true, data });

  } catch (err) {
    console.error("Server caught an error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});







// ------------------- START SERVER -------------------
const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

