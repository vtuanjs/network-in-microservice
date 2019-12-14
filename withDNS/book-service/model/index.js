const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  numberPages: {
    type: Number,
    required: false
  },
  publisher: {
    type: String,
    required: false
  }
});

const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
