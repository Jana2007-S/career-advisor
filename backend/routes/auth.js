const express = require("express");
const router = express.Router();

// Temporary in-memory user storage (replace with database later)
let users = [
  {
    _id: "1",
    name: "Test User",
    email: "test@test.com",
    password: "123",
    marks: 85,
    interests: ["tech"]
  }
];

// REGISTER API
router.post("/register", async (req, res) => {
  try {
    // Check if user already exists
    const existingUser = users.find(u => u.email === req.body.email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = {
      _id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // In production, hash passwords!
      marks: req.body.marks,
      interests: req.body.interests || ["tech"]
    };

    users.push(newUser);
    res.send("User Registered Successfully");
  } catch (err) {
    res.status(500).send("Error");
  }
});

// LOGIN API
router.post("/login", async (req, res) => {
  try {
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password);

    if (user) {
      res.json({ message: "Login Successful", user });
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).send("Error");
  }
});

// TEST API
router.get("/test", async (req, res) => {
  res.send("API working");
});

module.exports = router;