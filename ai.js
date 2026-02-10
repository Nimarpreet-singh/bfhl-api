const axios = require("axios");

async function getAIAnswer(question) {
  if (!question || typeof question !== "string") {
    throw { status: 400, message: "Invalid AI question" };
  }

  try {
    const url =
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

    const response = await axios.post(
      `${url}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `${question} Answer in one word only. Do not explain.`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 10000
      }
    );

    // safely extract text
    const rawText =
      response.data &&
      response.data.candidates &&
      response.data.candidates[0] &&
      response.data.candidates[0].content &&
      response.data.candidates[0].content.parts &&
      response.data.candidates[0].content.parts[0] &&
      response.data.candidates[0].content.parts[0].text;

    if (!rawText) {
      throw new Error("Empty AI response");
    }

    // clean output: single word, no punctuation
    const answer = rawText.trim().replace(/[^\w]/g, "");

    if (!answer) {
      throw new Error("Invalid AI output");
    }

    return answer;

  } catch (err) {
    console.error(
      "AI ERROR:",
      err.response?.data || err.message || err
    );

    throw { status: 502, message: "AI service unavailable" };
  }
}

module.exports = getAIAnswer;
