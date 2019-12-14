const express = require("express");
const app = express();
const axios = require("axios");
const config = require("./config")

app.listen(config.PORT, () => {
  console.log("Express 1 running at: " + config.PORT);
});

app.get("/", (req, res) => {
  res.send("Express 1 working...");
});

app.get("/books", async (req, res) => {
  try {
    const response = await axios.get(`http://${config.HOST_BOOK_SERVICE}:${config.PORT_BOOK_SERVICE}/books`);

    res.json({
      books: response.data
    });
  } catch (error) {
    res.json("Error: " + error);
  }
});
