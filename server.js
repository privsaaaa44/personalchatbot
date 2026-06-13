// server.js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "Server running", apiKeyLoaded: !!process.env.GROQ_API_KEY });
});

app.post("/api/chat", async (req, res) => {
  const { system, messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  // Check if API key exists
  if (!process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY is not set");
    return res.status(500).json({ error: "Server configuration error: API key missing" });
  }

  try {
    console.log("Calling Groq API with", messages.length, "messages");
    
    // Build messages array with system prompt
    const messagesWithSystem = system 
      ? [{ role: 'system', content: system }, ...messages]
      : messages;
    
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: messagesWithSystem,
          messages,
          temperature: 0.7,
        }),
      }
    );

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API error (Status " + response.status + "):");
      console.error("Response URL:", response.url);
      console.error("Response headers:", Object.fromEntries(response.headers));
      console.error("Response body:", errorText);
      
      try {
        const errorData = JSON.parse(errorText);
        console.error("Parsed error:", errorData);
        return res.status(response.status).json({
          error: errorData?.error?.message || "API error",
        });
      } catch {
        return res.status(response.status).json({
          error: `Groq API Error (${response.status}): ${errorText}`,
        });
      }
    }

    // Parse successful response
    let data;
    try {
      data = await response.json();
    } catch (parseErr) {
      console.error("Failed to parse Groq response:", parseErr);
      return res.status(500).json({ error: "Invalid response from API" });
    }

    const reply = data.choices?.[0]?.message?.content;
    if (!reply) {
      console.error("No reply in Groq response:", data);
      return res.status(500).json({ error: "No response from AI" });
    }

    // Send clean response to frontend
    res.json({ reply });

  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Internal server error: " + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(
    `API key loaded: ${
      process.env.GROQ_API_KEY ? "YES" : "MISSING"
    }`
  );
});