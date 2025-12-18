const express = require("express");
const app = express();

const PORT = process.env.PORT || 10000;

// test route (important)
app.get("/", (req, res) => {
  res.send("Giving Sphere Backend is running");
});

// PASSES ROUTE (THIS IS WHAT ROBLOX NEEDS)
app.get("/passes/:userId", (req, res) => {
  const userId = req.params.userId;

  // example response (you can change later)
  res.json({
    userId: userId,
    passes: [
      { id: 123456, price: 10 },
      { id: 789012, price: 50 }
    ]
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
