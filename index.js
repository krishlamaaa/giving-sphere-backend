const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/passes/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const url =
      `https://catalog.roblox.com/v1/search/items/details` +
      `?Category=Pass&CreatorType=User&CreatorTargetId=${userId}&SalesTypeFilter=1&limit=30`;

    const response = await fetch(url);
    const data = await response.json();

    const passes = (data.data || []).map(p => ({
      id: p.id,
      name: p.name,
      price: p.price
    }));

    res.json(passes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch passes" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
