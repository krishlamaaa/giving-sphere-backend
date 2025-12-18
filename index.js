const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 10000;

app.get("/", (req, res) => {
  res.send("Giving Sphere Backend is running");
});

app.get("/passes/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const url =
      `https://catalog.roblox.com/v1/search/items/details` +
      `?Category=Pass&CreatorType=User&CreatorTargetId=${userId}` +
      `&SalesTypeFilter=1&Limit=30`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch gamepasses" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
