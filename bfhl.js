const express = require("express");
const router = express.Router();

const { fibonacci, getPrimes, hcf, lcm } = require("./math");
const getAIAnswer = require("./ai");

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        error: "Only one key allowed"
      });
    }

    const key = keys[0];
    const value = body[key];
    let data;

    if (key === "fibonacci") {
      if (!Number.isInteger(value) || value <= 0)
        throw { status: 400, message: "Invalid fibonacci input" };
      data = fibonacci(value);

    } else if (key === "prime") {
      if (!Array.isArray(value))
        throw { status: 400, message: "Prime expects array" };
      data = getPrimes(value);

    } else if (key === "lcm") {
      if (!Array.isArray(value) || value.length < 2)
        throw { status: 400, message: "LCM needs array" };
      data = lcm(value);

    } else if (key === "hcf") {
      if (!Array.isArray(value) || value.length < 2)
        throw { status: 400, message: "HCF needs array" };
      data = hcf(value);

    } else if (key === "AI") {
      if (typeof value !== "string")
        throw { status: 400, message: "Invalid AI input" };
      data = await getAIAnswer(value);

    } else {
      throw { status: 400, message: "Unknown key" };
    }

    res.json({
      is_success: true,
      official_email: process.env.OFFICIAL_EMAIL,
      data
    });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
