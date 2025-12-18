const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

// test route
app.get("/", (req, res) => {
  res.send("Giving Sphere backend is running");
});

// gamepass route
app.get("/passes/:userId", (req, res) => {
  const userId = req.params.userId;

  // TEMP test response (we will connect Roblox catalog later)
  res.json({
    userId: userId,
    passes: []
  });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
