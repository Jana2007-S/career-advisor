const authRoutes = require("./routes/auth");
const testRoutes = require("./routes/test");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", testRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});