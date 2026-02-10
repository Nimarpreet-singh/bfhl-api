require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bfhl = require("./bfhl");
const health = require("./health");

const app = express();

app.use(cors());
app.use(express.json());

// console.log("TYPE bfhl:", typeof bfhl);
// console.log("TYPE health:", typeof health);

app.use("/bfhl", bfhl);
app.use("/health", health);


app.use("/bfhl", bfhl);
app.use("/health", health);

app.use((err, req, res, next) => {
  console.log("Error:", err.message);
  res.status(err.status || 500).json({
    is_success: false,
    error: err.message || "Something went wrong"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
