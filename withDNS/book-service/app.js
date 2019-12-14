const express = require("express");
const app = express();
const book = require("./controller");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Books services");
});

app.post("/books", book.createBook);

app.get("/books", book.getBooks);

app.get("/books/:id", book.getBook);

app.put("/books/:id", book.updateBook);

app.delete("/books/:id", book.deleteBook);

module.exports = app