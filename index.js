import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Giving Sphere backend is running");
});

app.get("/passes/:userId", async (req, res) => {
  try {
    const response = await fetch(
      `https://games.roblox.com/v1/users/${req.params.userId}/games`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
