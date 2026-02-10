const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL
  });
});

module.exports = router;
