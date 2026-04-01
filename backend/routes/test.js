const express = require("express");
const router = express.Router();

// SAMPLE QUESTIONS (for now)
const questions = [
  { question: "Do you like math?", category: "science" },
  { question: "Do you enjoy business?", category: "commerce" },
  { question: "Do you like creativity?", category: "arts" }
];

// GET QUESTIONS
router.get("/questions", (req, res) => {
  res.json(questions);
});

module.exports = router;

// SUBMIT TEST
router.post("/submit-test", (req, res) => {
  const answers = req.body.answers;

  let science = 0;
  let commerce = 0;
  let arts = 0;

  answers.forEach(ans => {
    if (ans === "science") science++;
    if (ans === "commerce") commerce++;
    if (ans === "arts") arts++;
  });

  let stream = "Arts";

  if (science > commerce && science > arts) {
    stream = "Science";
  } else if (commerce > arts) {
    stream = "Commerce";
  }

  res.json({
    science,
    commerce,
    arts,
    recommendedStream: stream
  });
});